package services

import (
	"context"
	"fmt"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/gen"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type MatchServiceInterface interface {
	gen.MatchServiceServer
}

var _ MatchServiceInterface = (*MatchService)(nil)

type MatchService struct {
	AbstractService
	logger   *zap.Logger
	cfg      *config.Config
	userDao  dao.UserDaoInterface
	clubDao  dao.ClubDaoInterface
	matchDao dao.MatchDaoInterface
}

func NewMatchService(logger *zap.Logger, cfg *config.Config, userDao dao.UserDaoInterface, clubDao dao.ClubDaoInterface, matchDao dao.MatchDaoInterface) *MatchService {
	return &MatchService{logger: logger, cfg: cfg, userDao: userDao, clubDao: clubDao, matchDao: matchDao}
}

func (e *MatchService) RegisterGrpcServer(s *grpc.Server) {
	gen.RegisterMatchServiceServer(s, e)
}

func (e *MatchService) RegisterHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	err := gen.RegisterMatchServiceHandler(ctx, mux, conn)
	if err != nil {
		return err
	}

	return nil
}

func (e *MatchService) CreateMatchCalendar(ctx context.Context, request *gen.MatchCalendar) (*gen.MatchCalendarRequest, error) {
	// Extract the Matches data from the request
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}
	season := request.Season
	clubOne := request.ClubOneName
	clubTwo := request.ClubTwoName
	clubOneInfo, err := e.clubDao.FindClubByNameAndSeaSon(clubOne, season)
	if err != nil || clubOneInfo == nil {
		return nil, fmt.Errorf("failed to get club one info: %w", err)
	}
	clubTwoInfo, err := e.clubDao.FindClubByNameAndSeaSon(clubTwo, season)
	if err != nil || clubTwoInfo == nil {
		return nil, fmt.Errorf("failed to get club two info: %w", err)
	}
	// Create a new Matches model
	newMatchCalendar := &models.Matches{
		SeaSon:      request.Season,
		ClubOneName: request.ClubOneName,
		ClubTwoName: request.ClubTwoName,
		IdClubOne:   clubOneInfo.ID,
		IdClubTwo:   clubTwoInfo.ID,
		IntendTime:  request.IntendTime,
		Stadium:     clubOneInfo.Stadium,
		RealTime:    "",
		MatchRound:  request.MatchRound,
		MatchTurn:   request.MatchTurn,
	}

	// Use the matchDao to insert the new Matches into the database
	err = e.matchDao.CreateMatchCalendar(newMatchCalendar)
	if err != nil {
		return nil, fmt.Errorf("failed to create match calendar: %w", err)
	}

	// If the insertion is successful, return a CreateMatchCalendarResponse with the ID of the new Matches
	return &gen.MatchCalendarRequest{
		Id: newMatchCalendar.ID,
	}, nil
}

func (e *MatchService) UpdateMatchCalendar(ctx context.Context, request *gen.MatchCalendar) (*gen.MatchCalendarResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}
	match, err := e.matchDao.GetMatchCalendarByID(request.Id)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}
	updateMatchCalendar := &models.Matches{
		ClubOneName: request.ClubOneName,
		ClubTwoName: request.ClubTwoName,
		IntendTime:  request.IntendTime,
		Stadium:     request.Stadium,
		RealTime:    request.RealTime,
		MatchRound:  request.MatchRound,
	}
	err = e.matchDao.UpdateMatchCalendar(updateMatchCalendar, match.ID)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.MatchCalendarResponse{
		Data: &gen.MatchCalendarResponse_Data{
			ClubOneName: updateMatchCalendar.ClubOneName,
			ClubTwoName: updateMatchCalendar.ClubTwoName,
			IntendTime:  updateMatchCalendar.IntendTime,
			Stadium:     updateMatchCalendar.Stadium,
			RealTime:    updateMatchCalendar.RealTime,
			MatchRound:  updateMatchCalendar.MatchRound,
		},
		Message: "Match calendar updated successfully",
	}, nil
}

func (e *MatchService) CreateProgressScore(ctx context.Context, request *gen.ProgressScore) (*gen.SuccessMessageResponse, error) {
	// Extract the ProgressScore data from the request
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	match, err := e.matchDao.GetMatchCalendarByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get match: %w", err)
	}

	// Check if the ClubName from the request is one of the two club names in the match
	if request.ClubName != match.ClubOneName && request.ClubName != match.ClubTwoName {
		return nil, fmt.Errorf("invalid club name: %s is not a participant in match %s", request.ClubName, request.MatchId)
	}

	// Create a new ProgressScore model
	newProgressScore := &models.ProgressScore{
		MatchID:     request.MatchId,
		ClubName:    request.ClubName,
		PlayerName:  request.PlayerName,
		GoalType:    request.GoalType,
		TimeInMatch: request.TimeInMatch,
	}

	// Use the matchDao to insert the new ProgressScore into the database
	err = e.matchDao.CreateProgressScore(newProgressScore)
	if err != nil {
		return nil, fmt.Errorf("failed to create progress score: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Progress score created successfully",
		},
	}, nil
}
func (e *MatchService) CreateProgressCard(ctx context.Context, request *gen.ProgressCard) (*gen.SuccessMessageResponse, error) {
	// Extract the ProgressScore data from the request
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	match, err := e.matchDao.GetMatchCalendarByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get match: %w", err)
	}

	// Check if the ClubName from the request is one of the two club names in the match
	if request.ClubName != match.ClubOneName && request.ClubName != match.ClubTwoName {
		return nil, fmt.Errorf("invalid club name: %s is not a participant in match %s", request.ClubName, request.MatchId)
	}

	// Create a new ProgressScore model
	newProgressCard := &models.ProgressCard{
		MatchID:     request.MatchId,
		ClubName:    request.ClubName,
		PlayerName:  request.PlayerName,
		CardType:    request.CardType,
		TimeInMatch: request.TimeInMatch,
	}

	// Use the matchDao to insert the new ProgressScore into the database
	err = e.matchDao.CreateProgressCard(newProgressCard)
	if err != nil {
		return nil, fmt.Errorf("failed to create progress score: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Progress card created successfully",
		},
	}, nil
}

func (e *MatchService) CreateMatchResult(ctx context.Context, request *gen.ResultScore) (*gen.SuccessMessageResponse, error) {
	// Extract the user from the context
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	_, err = e.matchDao.GetMatchResultByID(request.MatchId)
	if err == nil {
		return nil, fmt.Errorf("match result with MatchID %s already exists", request.MatchId)
	}

	// Fetch the match data using the MatchID from the request
	match, err := e.matchDao.GetMatchCalendarByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get match: %w", err)
	}

	// Fetch the ProgressScore data for both teams
	homeTeamGoals, err := e.matchDao.CountGoals(match.ID, match.ClubOneName)
	if err != nil {
		return nil, fmt.Errorf("failed to get goals for home team: %w", err)
	}
	awayTeamGoals, err := e.matchDao.CountGoals(match.ID, match.ClubTwoName)
	if err != nil {
		return nil, fmt.Errorf("failed to get goals for away team: %w", err)
	}

	YellowCard, RedCard, err := e.matchDao.CountCard(match.ID, match.ClubOneName)
	if err != nil {
		return nil, fmt.Errorf("failed to get card for home team: %w", err)
	}
	YellowCard2, RedCard2, err := e.matchDao.CountCard(match.ID, match.ClubTwoName)
	if err != nil {
		return nil, fmt.Errorf("failed to get card for away team: %w", err)
	}

	// Create a new ResultScore model
	newResultScore := &models.Results{
		MatchID:        request.MatchId,
		HomeTeamGoal:   homeTeamGoals,
		AwayTeamGoal:   awayTeamGoals,
		HomeTeam:       match.ClubOneName,
		AwayTeam:       match.ClubTwoName,
		YellowCardHome: YellowCard,
		RedCardHome:    RedCard,
		YellowCardAway: YellowCard2,
		RedCardAway:    RedCard2,
		SeaSon:         match.SeaSon,
	}

	// Use the matchDao to insert the new ResultScore into the database
	err = e.matchDao.CreateResultScore(newResultScore)
	if err != nil {
		return nil, fmt.Errorf("failed to create result score: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Result score created successfully",
		},
	}, nil
}

func (e *MatchService) CreateAllMatchResults(ctx context.Context, request *gen.EmptyRequest) (*gen.SuccessMessageResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	matches, err := e.matchDao.GetAllMatchDone()
	if err != nil {
		return nil, fmt.Errorf("failed to get all matches: %w", err)
	}

	if len(matches) == 0 {
		return &gen.SuccessMessageResponse{
			Data: &gen.SuccessMessageResponseSuccessMessage{
				Message: "No matches to process",
			},
		}, nil
	}

	for _, match := range matches {
		// Check if the match result already exists
		_, err = e.matchDao.GetMatchResultByID(match.MatchID)
		if err == nil {
			// If the match result already exists, skip to the next match
			continue
		}
		status, err := e.matchDao.GetMatchCalendarByID(match.MatchID)
		if err != nil {
			return nil, fmt.Errorf("failed to get match: %w", err)
		}
		if status.MatchStatus == "yes" {
			continue
		}
		request := &gen.ResultScore{
			MatchId: match.MatchID,
		}

		// Call the CreateMatchResult function
		_, err = e.CreateMatchResult(ctx, request)
		if err != nil {
			return nil, fmt.Errorf("failed to create match result for match %s: %w", match.ID, err)
		}
		err = e.matchDao.UpdateMatchStatus(match.MatchID, "yes")
		if err != nil {
			return nil, fmt.Errorf("failed to update match status for match %s: %w", match.ID, err)
		}
		err = e.matchDao.UpdateAllProgressScoreStatus(match.MatchID, "yes")
		if err != nil {
			return nil, fmt.Errorf("failed to update progress score status for match %s: %w", match.ID, err)
		}
		err = e.matchDao.UpdateAllProgressCardStatus(match.MatchID, "yes")
		if err != nil {
			return nil, fmt.Errorf("failed to update progress card status for match %s: %w", match.ID, err)
		}
	}

	// Return a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Result score created successfully",
		},
	}, nil
}

func (e *MatchService) CreateGoalType(ctx context.Context, goalType *gen.GoalType) (*gen.SuccessMessageResponse, error) {
	// Create a new GoalType model
	newGoalType := &models.GoalType{
		GoalTypeName: goalType.GoalTypeName,
		GoalTypeID:   goalType.GoalTypeId,
	}

	// Use the matchDao to insert the new GoalType into the database
	err := e.matchDao.CreateGoalType(newGoalType)
	if err != nil {
		return nil, fmt.Errorf("failed to create goal type: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Goal type created successfully",
		},
	}, nil
}

func (e *MatchService) CreateCardType(ctx context.Context, cardType *gen.CardType) (*gen.SuccessMessageResponse, error) {
	// Create a new CardType model
	newCardType := &models.CardType{
		CardTypeID:   cardType.CardTypeId,
		CardTypeName: cardType.CardTypeName,
	}

	// Use the matchDao to insert the new CardType into the database
	err := e.matchDao.CreateCardType(newCardType)
	if err != nil {
		return nil, fmt.Errorf("failed to create card type: %w", err)
	}

	// If the insertion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Card type created successfully",
		},
	}, nil
}

func (e *MatchService) DeleteGoalType(ctx context.Context, goalType *gen.GoalType) (*gen.SuccessMessageResponse, error) {
	// Use the matchDao to delete the GoalType from the database
	err := e.matchDao.DeleteGoalTypeByID(goalType.GoalTypeId)
	if err != nil {
		return nil, fmt.Errorf("failed to delete goal type: %w", err)
	}

	// If the deletion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Goal type deleted successfully",
		},
	}, nil
}

func (e *MatchService) DeleteCardType(ctx context.Context, cardType *gen.CardType) (*gen.SuccessMessageResponse, error) {
	// Use the matchDao to delete the CardType from the database
	err := e.matchDao.DeleteCardTypeByID(cardType.CardTypeId)
	if err != nil {
		return nil, fmt.Errorf("failed to delete card type: %w", err)
	}

	// If the deletion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Card type deleted successfully",
		},
	}, nil
}
