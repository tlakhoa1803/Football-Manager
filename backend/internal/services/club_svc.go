package services

import (
	"context"
	"fmt"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/gen"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/google/uuid"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"strconv"
)

type ClubServiceInterface interface {
	gen.ClubServiceServer
}

var _ ClubServiceInterface = (*ClubService)(nil)

type ClubService struct {
	AbstractService
	logger  *zap.Logger
	cfg     *config.Config
	userDao dao.UserDaoInterface
	clubDao dao.ClubDaoInterface
}

func NewClubService(logger *zap.Logger, cfg *config.Config, userDao dao.UserDaoInterface, clubDao dao.ClubDaoInterface) *ClubService {
	return &ClubService{logger: logger, cfg: cfg, userDao: userDao, clubDao: clubDao}
}

func (e *ClubService) RegisterGrpcServer(s *grpc.Server) {
	gen.RegisterClubServiceServer(s, e)
}

func (e *ClubService) RegisterHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	err := gen.RegisterClubServiceHandler(ctx, mux, conn)
	if err != nil {
		return err
	}

	return nil
}

func (e *ClubService) CreateClub(ctx context.Context, request *gen.ClubProfileRequest) (*gen.ClubProfileResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Check if the user is an admin
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	// Create a new Club model
	newClub := &models.Club{
		NameClub:    request.NameClub,
		Shorthand:   request.ShortHand,
		NameAward:   request.NameAward,
		SeaSon:      request.SeaSon,
		Achievement: request.Achievement,
		OwnerBy:     request.OwnerBy,
		CreatedBy:   user.Name,
		LinkLogo:    request.Logo,
		DomainEmail: request.ShortHand + ".vn", // Concatenate Shorthand and "vn"
	}

	// Use the clubDao to insert the new Club into the database
	err = e.clubDao.CreateClub(newClub)
	if err != nil {
		return nil, fmt.Errorf("failed to create club: %w", err)
	}

	// If the insertion is successful, return a ClubProfileResponse with the new club's details
	return &gen.ClubProfileResponse{
		Data: &gen.ClubProfileResponse_Data{
			Id:          newClub.ID,
			NameClub:    newClub.NameClub,
			NameAward:   newClub.NameAward,
			NameStadium: newClub.NameStadium,
			SeaSon:      newClub.SeaSon,
			Achievement: newClub.Achievement,
			OwnerBy:     newClub.OwnerBy,
			Logo:        newClub.LinkLogo,
		},
		Message: "Club created successfully",
	}, nil
}

func (e *ClubService) CreatePlayer(ctx context.Context, request *gen.PLayerProfileRequest) (*gen.SuccessMessageResponse, error) {
	// Extract the Player data from the request
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	club, err := e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}

	// Create a new Player model
	newPlayer := &models.Player{
		ID:          uuid.New().String(),
		ClubID:      club.ID, // Set the ClubID field
		ClubName:    club.NameClub,
		SeaSon:      club.SeaSon,
		TypePlayer:  request.TypePlayer,
		Name:        request.Name,
		BirthDay:    request.BirthDay,
		Height:      request.Height,
		Weight:      request.Weight,
		Position:    request.Position,
		Nationality: request.Nationality,
		Kit:         request.Kit,
		Achievement: request.Achievement,
		CreatedBy:   user.Name,
		Status:      request.Status,
	}

	// Use the clubDao to insert the new Player into the database
	err = e.clubDao.CreatePlayer(newPlayer)
	if err != nil {
		return nil, fmt.Errorf("failed to create player: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Player created successfully",
		},
	}, nil
}

func (e *ClubService) GetAllPlayerProfile(ctx context.Context, request *gen.EmptyRequest) (*gen.PlayerProfileListResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	club, err := e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}

	// Check if the user is the owner of the club
	if user.Position != "Owner" && user.Position != "Member" {
		return nil, fmt.Errorf("user is not the owner of the club")
	}

	// Get all players in the club
	players, err := e.clubDao.GetAllPlayersInClub(club.ID)
	if err != nil {
		return nil, fmt.Errorf("failed to get all players in club: %w", err)
	}

	// Initialize the response
	response := &gen.PlayerProfileListResponse{
		Data: make([]*gen.PLayerProfileResponse_Data, 0, len(players)),
	}
	naturalizationPlayerCount := 0
	// Convert each player to the PlayerProfile protobuf message and append it to the response
	for _, player := range players {
		response.Data = append(response.Data, &gen.PLayerProfileResponse_Data{
			ClubName: player.ClubName,
			//SeaSon:      player.SeaSon,
			TypePlayer:  player.TypePlayer,
			Name:        player.Name,
			BirthDay:    player.BirthDay,
			Height:      player.Height,
			Weight:      player.Weight,
			Position:    player.Position,
			Nationality: player.Nationality,
			Kit:         player.Kit,
			Achievement: player.Achievement,
		})
		if player.TypePlayer == "Naturalization Player" {
			naturalizationPlayerCount++
		}
	}
	// Count the number of players in the club
	playerCount := len(players)
	response.Message = fmt.Sprintf("There are %d players in %s club", playerCount, club.NameClub)
	response.ForeignPlayer = strconv.Itoa(naturalizationPlayerCount)
	response.Player = strconv.Itoa(playerCount)
	return response, nil

}

func (e *ClubService) GetClubProfile(ctx context.Context, request *gen.EmptyRequest) (*gen.ClubProfileResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	club, err := e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}
	// Check if the user is the owner of the club
	//if user.Name != club.OwnerBy {
	//	return nil, fmt.Errorf("user is not the owner of the club")
	//}

	// Create the response
	response := &gen.ClubProfileResponse{
		Data: &gen.ClubProfileResponse_Data{
			OwnerBy:     club.OwnerBy,
			NameClub:    club.NameClub,
			NameAward:   club.NameAward,
			SeaSon:      club.SeaSon,
			Shorthand:   club.Shorthand,
			NameStadium: club.NameStadium,
			Achievement: club.Achievement,
			UpdateBy:    club.UpdatedBy,
			Logo:        club.LinkLogo,
			ClubId:      club.ID,
		},
	}

	return response, nil
}
func (e *ClubService) UpdateClub(ctx context.Context, request *gen.ClubProfileRequest) (*gen.ClubProfileResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	club, err := e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}
	// Check if the user is the owner of the club
	//if user.Name != club.OwnerBy {
	//	return nil, fmt.Errorf("user is not the owner of the club")
	//}
	updateClub := &models.Club{
		NameClub:    request.NameClub,
		NameAward:   request.NameAward,
		NameStadium: request.NameStadium,
		SeaSon:      request.SeaSon,
		Achievement: request.Achievement,
		OwnerBy:     request.OwnerBy,
		UpdatedBy:   user.Name,
	}
	err = e.clubDao.UpdateClub(updateClub, club.ID)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.ClubProfileResponse{
		Data: &gen.ClubProfileResponse_Data{
			OwnerBy:     updateClub.OwnerBy,
			NameClub:    updateClub.NameClub,
			NameAward:   updateClub.NameAward,
			SeaSon:      updateClub.SeaSon,
			Shorthand:   updateClub.Shorthand,
			NameStadium: updateClub.NameStadium,
			Achievement: updateClub.Achievement,
			UpdateBy:    updateClub.UpdatedBy,
		},
		Message: "Update club profile successfully",
	}, nil
}

func (e *ClubService) UpdatePlayer(ctx context.Context, request *gen.PLayerProfileRequest) (*gen.PLayerProfileResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	_, err = e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}
	// Check if the user is the owner of the club
	//if user.Name != club.OwnerBy {
	//	return nil, fmt.Errorf("user is not the owner of the club")
	//}

	player, err := e.clubDao.GetPLayerByID(request.Id)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}
	updatePlayer := &models.Player{
		ClubName:    request.ClubName,
		SeaSon:      request.SeaSon,
		TypePlayer:  request.TypePlayer,
		Name:        request.Name,
		BirthDay:    request.BirthDay,
		Height:      request.Height,
		Weight:      request.Weight,
		Position:    request.Position,
		Nationality: request.Nationality,
		Kit:         request.Kit,
		Achievement: request.Achievement,
	}
	err = e.clubDao.UpdatePlayer(updatePlayer, player.ID)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.PLayerProfileResponse{
		Data: &gen.PLayerProfileResponse_Data{
			ClubName:    updatePlayer.ClubName,
			SeaSon:      updatePlayer.SeaSon,
			TypePlayer:  updatePlayer.TypePlayer,
			Name:        updatePlayer.Name,
			BirthDay:    updatePlayer.BirthDay,
			Height:      updatePlayer.Height,
			Weight:      updatePlayer.Weight,
			Position:    updatePlayer.Position,
			Nationality: updatePlayer.Nationality,
			Kit:         updatePlayer.Kit,
			Achievement: updatePlayer.Achievement,
		},
		Message: "Update club profile successfully",
	}, nil
}

func (e *ClubService) DeleteCoach(ctx context.Context, request *gen.CoachRequest) (*gen.SuccessMessageResponse, error) {
	// Use the clubDao to delete the Coach from the database
	err := e.clubDao.DeleteCoach(request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to delete coach: %w", err)
	}

	// If the deletion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Coach deleted successfully",
		},
	}, nil
}

func (e *ClubService) GetAllClubProfile(ctx context.Context, request *gen.EmptyRequest) (*gen.ClubProfileListResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Check if the user is an admin
	position := user.Position
	if position == "" {
		return nil, fmt.Errorf("failed to get user position: %w", err)
	}
	if position != "Admin" {
		return nil, fmt.Errorf("user is not an admin")
	}

	clubs, err := e.clubDao.GetAllClubs()
	if err != nil {
		return nil, fmt.Errorf("failed to get all clubs: %w", err)
	}

	// Initialize the response
	response := &gen.ClubProfileListResponse{
		Data: make([]*gen.ClubProfileResponse_Data, 0, len(clubs)),
	}

	// Convert each club to the ClubProfile protobuf message and append it to the response
	for _, club := range clubs {
		response.Data = append(response.Data, &gen.ClubProfileResponse_Data{
			OwnerBy:     club.OwnerBy,
			NameClub:    club.NameClub,
			NameAward:   club.NameAward,
			SeaSon:      club.SeaSon,
			Shorthand:   club.Shorthand,
			NameStadium: club.NameStadium,
			Achievement: club.Achievement,
			UpdateBy:    club.UpdatedBy,
		})
	}

	return response, nil
}

func (e *ClubService) DeletePlayer(ctx context.Context, request *gen.PLayerRequest) (*gen.SuccessMessageResponse, error) {
	// Get the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	_, err = e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}

	// Check if the user is the owner of the club
	if user.Position != "Owner" && user.Position != "Member" {
		return nil, fmt.Errorf("user is not the owner of the club")
	}

	// Delete the player from the club
	err = e.clubDao.DeletePlayer(request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to delete player: %w", err)
	}

	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Delete player successfully",
		},
	}, nil
}

func (e *ClubService) CreateCoach(ctx context.Context, request *gen.CoachProfileRequest) (*gen.SuccessMessageResponse, error) {
	// Create a new Coach model
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Owner" && user.Position != "Member" {
		return nil, fmt.Errorf("user is not the owner of the club")
	}
	newCoach := &models.Coach{
		Name:     request.Name,
		Country:  request.Country,
		Award:    request.Award,
		Role:     request.Role,
		ClubID:   user.ClubID,
		NameClub: user.Club,
		BirthDay: request.Birthday,
	}

	// Use the clubDao to insert the new Coach into the database
	err = e.clubDao.CreateCoach(newCoach)
	if err != nil {
		return nil, fmt.Errorf("failed to create coach: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Coach created successfully",
		},
	}, nil
}

func (e *ClubService) UpdateCoach(ctx context.Context, request *gen.CoachProfileRequest) (*gen.SuccessMessageResponse, error) {
	// Create a new Coach model
	updatedCoach := &models.Coach{
		Name:     request.Name,
		Country:  request.Country,
		Award:    request.Award,
		Role:     request.Role,
		ClubID:   request.ClubId,
		BirthDay: request.Birthday,
	}

	// Use the clubDao to update the Coach in the database
	err := e.clubDao.UpdateCoach(updatedCoach, request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to update coach: %w", err)
	}

	// If the update is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Coach updated successfully",
		},
	}, nil
}

func (e *ClubService) GetCoachProfile(ctx context.Context, request *gen.CoachRequest) (*gen.CoachProfileResponse, error) {
	// Use the clubDao to get the Coach from the database
	coach, err := e.clubDao.GetCoachByID(request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to get coach: %w", err)
	}

	// Return a CoachProfileResponse with the Coach's details
	return &gen.CoachProfileResponse{
		Data: &gen.CoachProfileResponse_Data{
			Id:       coach.ID,
			Name:     coach.Name,
			ClubName: coach.NameClub,
			Country:  coach.Country,
			Award:    coach.Award,
			Role:     coach.Role,
			ClubId:   coach.ClubID,
		},
		Message: "Successfully retrieved coach profile",
	}, nil
}

func (e *ClubService) GetListCoachProfile(ctx context.Context, request *gen.CoachProfileListRequest) (*gen.CoachProfileListResponse, error) {
	// Use the clubDao to get all Coaches from the database
	coaches, err := e.clubDao.GetAllCoaches()
	if err != nil {
		return nil, fmt.Errorf("failed to get all coaches: %w", err)
	}

	// Initialize the response
	response := &gen.CoachProfileListResponse{
		Data: make([]*gen.CoachProfileResponse_Data, 0, len(coaches)),
	}

	// Convert each coach to the CoachProfile protobuf message and append it to the response
	for _, coach := range coaches {
		response.Data = append(response.Data, &gen.CoachProfileResponse_Data{
			Id:       coach.ID,
			Name:     coach.Name,
			ClubName: coach.NameClub,
			Country:  coach.Country,
			Award:    coach.Award,
			Role:     coach.Role,
			ClubId:   coach.ClubID,
		})
	}

	// Return the response
	return response, nil
}

func (e *ClubService) CreateStadium(ctx context.Context, request *gen.StadiumProfileRequest) (*gen.SuccessMessageResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}

	// Get the club from the context
	club, err := e.clubDao.GetClubByID(user.ClubID)
	if err != nil {
		return nil, fmt.Errorf("failed to get club by ID: %w", err)
	}

	// Create a new Stadium model
	newStadium := &models.Stadium{
		ClubID:         club.ID,
		StadiumName:    request.StadiumName,
		StadiumAddress: request.StadiumAddress,
		Capacity:       request.Capacity,
		Season:         club.SeaSon,
	}
	// Use the clubDao to insert the new Player into the database
	err = e.clubDao.CreateStadium(newStadium)
	if err != nil {
		return nil, fmt.Errorf("failed to create player: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Stadium created successfully",
		},
	}, nil
}
