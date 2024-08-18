package services

import (
	"context"
	"fmt"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/gen"
	"github.com/NMCNPM-football/backend/internal/dao"
	_ "github.com/NMCNPM-football/backend/internal/models"
	_ "github.com/NMCNPM-football/backend/internal/must"
	_ "github.com/NMCNPM-football/backend/internal/serializers"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"

	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type MatchServicePublicInterface interface {
	gen.MatchServicePublicServer
}

var _ MatchServicePublicInterface = (*MatchServicePublic)(nil)

type MatchServicePublic struct {
	AbstractService
	logger     *zap.Logger
	cfg        *config.Config
	userDao    dao.UserDaoInterface
	clubDao    dao.ClubDaoInterface
	matchDao   dao.MatchDaoInterface
	summaryDao dao.SummaryDaoInterface
}

func (e *MatchServicePublic) GetAllMatchCalendarByRound(ctx context.Context, request *gen.RoundRequest) (*gen.MatchCalendarListResponse, error) {
	// Use the matchDao to get all MatchCalendars for the specific round from the database
	matchCalendars, err := e.matchDao.GetAllMatchCalendarsByRound(request.Round)
	if err != nil {
		return nil, fmt.Errorf("failed to get all match calendars for round %d: %w", request.Round, err)
	}

	// Convert the MatchCalendars to the protobuf MatchCalendar
	var pbMatchCalendars []*gen.MatchCalendarResponse_Data
	for _, matchCalendar := range matchCalendars {
		pbMatchCalendar := &gen.MatchCalendarResponse_Data{
			ClubOneName: matchCalendar.ClubOneName,
			ClubTwoName: matchCalendar.ClubTwoName,
			IntendTime:  matchCalendar.IntendTime,
			RealTime:    matchCalendar.RealTime,
			MatchRound:  matchCalendar.MatchRound,
			MatchTurn:   matchCalendar.MatchTurn,
			MatchStatus: matchCalendar.MatchStatus,
			Stadium:     matchCalendar.Stadium,
			Season:      matchCalendar.SeaSon,
			MatchId:     matchCalendar.ID,
		}
		pbMatchCalendars = append(pbMatchCalendars, pbMatchCalendar)
	}

	// Return a MatchCalendarListResponse with the MatchCalendars
	return &gen.MatchCalendarListResponse{
		Data:    pbMatchCalendars,
		Message: fmt.Sprintf("Successfully retrieved all match calendars for round %d", request.Round),
	}, nil
}
func NewMatchServicePublic(logger *zap.Logger, cfg *config.Config, userDao dao.UserDaoInterface, clubDao dao.ClubDaoInterface, matchDao dao.MatchDaoInterface, summaryDao dao.SummaryDaoInterface) *MatchServicePublic {
	return &MatchServicePublic{logger: logger, cfg: cfg, userDao: userDao, clubDao: clubDao, matchDao: matchDao, summaryDao: summaryDao}
}

func (e *MatchServicePublic) RegisterGrpcServer(s *grpc.Server) {
	gen.RegisterMatchServicePublicServer(s, e)
}

func (e *MatchServicePublic) RegisterHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	err := gen.RegisterMatchServicePublicHandler(ctx, mux, conn)
	if err != nil {
		return err
	}

	return nil
}
func (e *MatchServicePublic) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	return ctx, nil
}

func (e *MatchServicePublic) GetAllMatchCalendar(ctx context.Context, request *gen.EmptyRequest) (*gen.MatchCalendarListResponse, error) {
	matches, err := e.matchDao.GetAllMatchCalendars()
	if err != nil {
		return nil, fmt.Errorf("failed to get all match calendars: %w", err)
	}

	response := &gen.MatchCalendarListResponse{
		Data: make([]*gen.MatchCalendarResponse_Data, 0, len(matches)),
	}

	for _, match := range matches {
		response.Data = append(response.Data, &gen.MatchCalendarResponse_Data{
			ClubOneName: match.ClubOneName,
			ClubTwoName: match.ClubTwoName,
			IntendTime:  match.IntendTime,
			RealTime:    match.RealTime,
			MatchRound:  match.MatchRound,
			MatchTurn:   match.MatchTurn,
			MatchStatus: match.MatchStatus,
			Stadium:     match.Stadium,
			Season:      match.SeaSon,
		})
	}
	matchCount := len(matches)
	response.Message = fmt.Sprintf("There are %d matches in league", matchCount)
	return response, nil
}
func (e *MatchServicePublic) GetAllMatchCalendarsWithStatus(ctx context.Context, request *gen.StatusRequest) (*gen.MatchCalendarListResponse, error) {
	matchCalendars, err := e.matchDao.GetAllMatchCalendarsWithStatus(request.Status)
	if err != nil {
		e.logger.Error("Failed to fetch match calendars", zap.Error(err))
		return nil, fmt.Errorf("failed to fetch match calendars: %w", err)
	}

	response := &gen.MatchCalendarListResponse{
		Data: make([]*gen.MatchCalendarResponse_Data, 0, len(matchCalendars)),
	}

	for _, matchCalendar := range matchCalendars {
		response.Data = append(response.Data, &gen.MatchCalendarResponse_Data{
			ClubOneName: matchCalendar.ClubOneName,
			ClubTwoName: matchCalendar.ClubTwoName,
			IntendTime:  matchCalendar.IntendTime,
			RealTime:    matchCalendar.RealTime,
			MatchRound:  matchCalendar.MatchRound,
			MatchStatus: matchCalendar.MatchStatus,
			Stadium:     matchCalendar.Stadium,
			Season:      matchCalendar.SeaSon,
		})
	}
	matchCount := len(matchCalendars)
	response.Message = fmt.Sprintf("There are %d matches in leauge with status '%s'", matchCount, request.Status)

	return response, nil
}

func (e *MatchServicePublic) GetMatchCalendarById(ctx context.Context, request *gen.MatchCalendarRequest) (*gen.MatchCalendarResponse, error) {
	matchCalendar, err := e.matchDao.GetMatchCalendarByID(request.Id)
	if err != nil {
		e.logger.Error("Failed to fetch match calendar", zap.Error(err))
		return nil, fmt.Errorf("failed to fetch match calendar: %w", err)
	}

	response := &gen.MatchCalendarResponse{
		Data: &gen.MatchCalendarResponse_Data{
			ClubOneName: matchCalendar.ClubOneName,
			ClubTwoName: matchCalendar.ClubTwoName,
			IntendTime:  matchCalendar.IntendTime,
			RealTime:    matchCalendar.RealTime,
			MatchTurn:   matchCalendar.MatchTurn,
			MatchRound:  matchCalendar.MatchRound,
			MatchStatus: matchCalendar.MatchStatus,
			Stadium:     matchCalendar.Stadium,
			Season:      matchCalendar.SeaSon,
		},
		Message: "Match calendar fetched successfully",
	}

	return response, nil
}

func (e *MatchServicePublic) GetMatchResultByID(ctx context.Context, request *gen.ResultScoreRequest) (*gen.ResultScoreResponse, error) {
	// Fetch the result score data using the MatchID from the request
	resultScore, err := e.matchDao.GetMatchResultByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get result score: %w", err)
	}

	// Create a new ResultScore
	response := &gen.ResultScoreResponse{
		Data: &gen.ResultScore{
			HomeTeamGoal:   int32(resultScore.HomeTeamGoal),
			AwayTeamGoal:   int32(resultScore.AwayTeamGoal),
			HomeTeam:       resultScore.HomeTeam,
			AwayTeam:       resultScore.AwayTeam,
			YellowCardHome: int32(resultScore.YellowCardHome),
			RedCardHome:    int32(resultScore.RedCardHome),
			YellowCardAway: int32(resultScore.YellowCardAway),
			RedCardAway:    int32(resultScore.RedCardAway),
		},
	}

	return response, nil
}

func (e *MatchServicePublic) GetAllMatchResults(ctx context.Context, request *gen.EmptyRequest) (*gen.ResultScoreListResponse, error) {
	// Fetch all result scores from the database
	resultScores, err := e.matchDao.GetAllMatchResults()
	if err != nil {
		return nil, fmt.Errorf("failed to get all match results: %w", err)
	}

	// Create a new ResultScoreListResponse
	response := &gen.ResultScoreListResponse{
		Data: make([]*gen.ResultScore, 0, len(resultScores)),
	}

	// Iterate over the result scores and add them to the response
	for _, resultScore := range resultScores {
		detail, err := e.matchDao.GetMatchCalendarByID(resultScore.MatchID)
		if err != nil {
			return nil, fmt.Errorf("failed to get match calendar by ID: %w", err)
		}
		detail1, err := e.clubDao.GetStadiumByClubID(detail.IdClubOne)
		if err != nil {
			return nil, fmt.Errorf("failed to get home team club by ID: %w", err)
		}

		detail3, err := e.clubDao.GetClubByID(detail.IdClubOne)
		if err != nil {
			return nil, fmt.Errorf("failed to home team club by ID: %w", err)
		}

		detail4, err := e.clubDao.GetClubByID(detail.IdClubTwo)
		if err != nil {
			return nil, fmt.Errorf("failed to away team club by ID: %w", err)
		}

		response.Data = append(response.Data, &gen.ResultScore{
			MatchId:        resultScore.MatchID,
			HomeTeamGoal:   int32(resultScore.HomeTeamGoal),
			AwayTeamGoal:   int32(resultScore.AwayTeamGoal),
			HomeTeam:       resultScore.HomeTeam,
			AwayTeam:       resultScore.AwayTeam,
			Time:           detail.RealTime,
			YellowCardHome: int32(resultScore.YellowCardHome),
			RedCardHome:    int32(resultScore.RedCardHome),
			YellowCardAway: int32(resultScore.YellowCardAway),
			RedCardAway:    int32(resultScore.RedCardAway),
			Stadium:        detail1.StadiumName,
			Capacity:       detail1.Capacity,
			HomeLogo:       detail3.LinkLogo,
			AwayLogo:       detail4.LinkLogo,
			MatchRound:     detail.MatchRound,
			SeaSon:         detail.SeaSon,
			Score:          fmt.Sprintf("%d - %d", resultScore.HomeTeamGoal, resultScore.AwayTeamGoal), // Add this line
		})
	}

	// Return the response
	return response, nil
}

func (e *MatchServicePublic) GetSummary(ctx context.Context, request *gen.GetSummaryRequest) (*gen.SummaryListResponse, error) {
	// Fetch all summaries for the given season
	summaries, err := e.summaryDao.GetSummaryBySeaSon(request.SeaSon)
	if err != nil {
		return nil, fmt.Errorf("failed to get summaries: %w", err)
	}

	response := &gen.SummaryListResponse{
		Data: make([]*gen.SummaryResponse, 0, len(summaries)),
	}
	response.Message = fmt.Sprintf("There are %d summaries in league", len(summaries))

	for _, summary := range summaries {
		temp, err := e.clubDao.GetClubByID(summary.ClubID)
		if err != nil {
			return nil, fmt.Errorf("failed to get club by ID: %w", err)
		}
		response.Data = append(response.Data, &gen.SummaryResponse{
			ClubId:         summary.ClubID,
			ClubName:       summary.ClubName,
			MatchPlayed:    int32(summary.MatchesPlayed),
			MatchWon:       int32(summary.MatchesWon),
			MatchLost:      int32(summary.MatchesLost),
			MatchDraw:      int32(summary.MatchesDraw),
			GoalScored:     int32(summary.GoalsScored),
			GoalConceded:   int32(summary.GoalsConceded),
			GoalDifference: int32(summary.GoalDifference),
			Points:         int32(summary.Points),
			YellowCard:     int32(summary.YellowCard),
			RedCard:        int32(summary.RedCard),
			Rank:           int32(summary.Rank),
			SeaSon:         summary.SeaSon,
			LogoLink:       summary.LogoLink,
			Shorthand:      temp.Shorthand,
		})
	}

	// Return the summaries
	// Return the response
	return response, nil
}

func (e *MatchServicePublic) GetAllMatchResultByRound(ctx context.Context, request *gen.RoundRequest) (*gen.ResultSumScoreListResponse, error) {
	// Fetch all match results for the given turn from the database
	resultScores, err := e.matchDao.GetAllMatchResultsByRound(request.Round)
	if err != nil {
		return nil, fmt.Errorf("failed to get match results: %w", err)
	}

	// Create a new ResultScoreListResponse
	response := &gen.ResultSumScoreListResponse{
		Data: make([]*gen.SumScore, 0, len(resultScores)),
	}

	// Iterate over the result scores and add them to the response
	for _, resultScore := range resultScores {
		detail, err := e.matchDao.GetMatchResultByID(resultScore.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to get match result by ID: %w", err)
		}

		detail2, err := e.matchDao.GetMatchCalendarByID(resultScore.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to get match calendar by ID: %w", err)
		}

		detail3, err := e.clubDao.GetClubByID(resultScore.IdClubOne)
		if err != nil {
			return nil, fmt.Errorf("failed to home team club by ID: %w", err)
		}

		detail4, err := e.clubDao.GetClubByID(resultScore.IdClubTwo)
		if err != nil {
			return nil, fmt.Errorf("failed to away team club by ID: %w", err)
		}

		response.Data = append(response.Data, &gen.SumScore{
			MatchId:          resultScore.ID,
			HomeTeamGoal:     int32(detail.HomeTeamGoal),
			HomeTeamName:     detail3.Shorthand,
			AwayTeamGoal:     int32(detail.AwayTeamGoal),
			AwayTeamName:     detail4.Shorthand,
			Stadium:          detail2.Stadium,
			Time:             detail2.RealTime,
			HomeLogo:         detail3.LinkLogo,
			AwayLogo:         detail4.LinkLogo,
			MatchRound:       request.Round,
			HomeTeamFullName: detail3.NameClub,
			AwayTeamFullName: detail4.NameClub,
			Score:            fmt.Sprintf("%d - %d", detail.HomeTeamGoal, detail.AwayTeamGoal), // Add this line
		})
	}

	// Return the response
	return response, nil
}

func (e *MatchServicePublic) GetProgressScoreByMatchID(ctx context.Context, request *gen.ResultScoreRequest) (*gen.ProgressScoreListResponse, error) {
	// Fetch the progress score data using the MatchID from the request
	progressScores, err := e.matchDao.GetProgressScoresByMatchID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get progress scores: %w", err)
	}

	// Create a new ProgressScoreListResponse
	response := &gen.ProgressScoreListResponse{
		Data:    make([]*gen.ProgressScore, 0, len(progressScores)),
		Message: "Progress scores fetched successfully",
	}

	// Iterate over the progress scores and add them to the response
	for _, progressScore := range progressScores {
		response.Data = append(response.Data, &gen.ProgressScore{
			MatchId:     progressScore.MatchID,
			ClubName:    progressScore.ClubName,
			PlayerName:  progressScore.PlayerName,
			GoalType:    progressScore.GoalType,
			TimeInMatch: progressScore.TimeInMatch,
		})
	}

	return response, nil
}

func (e *MatchServicePublic) GetProgressCardByMatchID(ctx context.Context, request *gen.ResultScoreRequest) (*gen.ProgressCardListResponse, error) {
	// Fetch the progress card data using the MatchID from the request
	progressCards, err := e.matchDao.GetProgressCardByMatchID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get progress cards: %w", err)
	}

	// Create a new ProgressCardListResponse
	response := &gen.ProgressCardListResponse{
		Data:    make([]*gen.ProgressCard, 0, len(progressCards)),
		Message: "Progress cards fetched successfully",
	}

	// Iterate over the progress cards and add them to the response
	for _, progressCard := range progressCards {
		response.Data = append(response.Data, &gen.ProgressCard{
			MatchId:     progressCard.MatchID,
			ClubName:    progressCard.ClubName,
			PlayerName:  progressCard.PlayerName,
			CardType:    progressCard.CardType,
			TimeInMatch: progressCard.TimeInMatch,
		})
	}

	return response, nil
}

func (e *MatchServicePublic) GetMatchStatisticByMatchID(ctx context.Context, request *gen.ResultScoreRequest) (*gen.ProgressGoal, error) {
	// Fetch the match details using the MatchID from the request
	matchDetails, err := e.matchDao.GetMatchResultByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get match details: %w", err)
	}
	detail1, err := e.matchDao.GetMatchCalendarByID(request.MatchId)
	if err != nil {
		return nil, fmt.Errorf("failed to get match calendar by ID: %w", err)
	}
	// Fetch the home team details
	homeTeamDetails, err := e.clubDao.GetClubByID(detail1.IdClubOne)
	if err != nil {
		return nil, fmt.Errorf("failed to get home team details: %w", err)
	}

	// Fetch the away team details
	awayTeamDetails, err := e.clubDao.GetClubByID(detail1.IdClubTwo)
	if err != nil {
		return nil, fmt.Errorf("failed to get away team details: %w", err)
	}

	stadium, err := e.clubDao.GetStadiumByClubID(detail1.IdClubOne)
	if err != nil {
		return nil, fmt.Errorf("failed to get stadium by ID: %w", err)

	}
	// Fetch progress scores and cards for the home team
	homeProgressScores, err := e.matchDao.GetProgressScoresByMatchClubID(request.MatchId, detail1.ClubOneName)
	if err != nil {
		return nil, fmt.Errorf("failed to get home team progress scores: %w", err)
	}
	homeProgressCards, err := e.matchDao.GetProgressCardByMatchClubID(request.MatchId, detail1.ClubOneName)
	if err != nil {
		return nil, fmt.Errorf("failed to get home team progress cards: %w", err)
	}

	// Fetch progress scores and cards for the away team
	awayProgressScores, err := e.matchDao.GetProgressScoresByMatchClubID(request.MatchId, detail1.ClubTwoName)
	if err != nil {
		return nil, fmt.Errorf("failed to get away team progress scores: %w", err)
	}
	awayProgressCards, err := e.matchDao.GetProgressCardByMatchClubID(request.MatchId, detail1.ClubTwoName)
	if err != nil {
		return nil, fmt.Errorf("failed to get away team progress cards: %w", err)
	}

	// Create a new ProgressGoal
	response := &gen.ProgressGoal{
		MatchId:  matchDetails.ID,
		Stadium:  detail1.Stadium,
		Time:     detail1.RealTime,
		Capacity: stadium.Capacity,
		HomeTeam: &gen.Team{
			Name:  homeTeamDetails.NameClub,
			Logo:  homeTeamDetails.LinkLogo,
			Goals: int32(matchDetails.HomeTeamGoal),
			// Add players to the home team
			Players: make([]*gen.Player, 0, len(homeProgressScores)+len(homeProgressCards)),
		},
		AwayTeam: &gen.Team{
			Name:  awayTeamDetails.NameClub,
			Logo:  awayTeamDetails.LinkLogo,
			Goals: int32(matchDetails.AwayTeamGoal),
			// Add players to the away team
			Players: make([]*gen.Player, 0, len(awayProgressScores)+len(awayProgressCards)),
		},
	}

	// Add players to the home team
	for _, score := range homeProgressScores {
		response.HomeTeam.Players = append(response.HomeTeam.Players, &gen.Player{
			PlayerNameGoal:  score.PlayerName,
			GoalType:        score.GoalType,
			TimeInMatchGoal: score.TimeInMatch,
		})
	}

	for _, card := range homeProgressCards {
		response.HomeTeam.Players = append(response.HomeTeam.Players, &gen.Player{
			PlayerNameCard:  card.PlayerName,
			CardType:        card.CardType,
			TimeInMatchCard: card.TimeInMatch,
		})
	}

	// Add progress scores and cards to the away team
	for _, score := range awayProgressScores {
		response.AwayTeam.Players = append(response.AwayTeam.Players, &gen.Player{
			PlayerNameGoal:  score.PlayerName,
			GoalType:        score.GoalType,
			TimeInMatchGoal: score.TimeInMatch,
		})
	}
	for _, card := range awayProgressCards {
		response.AwayTeam.Players = append(response.AwayTeam.Players, &gen.Player{
			PlayerNameCard:  card.PlayerName,
			CardType:        card.CardType,
			TimeInMatchCard: card.TimeInMatch,
		})
	}

	return response, nil
}

func (e *MatchServicePublic) GetAllGoalType(ctx context.Context, request *gen.EmptyRequest) (*gen.GoalTypeResponse, error) {
	// Use the matchDao to get all GoalTypes from the database
	goalTypes, err := e.matchDao.GetAllGoalType()
	if err != nil {
		return nil, fmt.Errorf("failed to get all goal types: %w", err)
	}

	// Convert the GoalTypes to the protobuf GoalType
	var pbGoalTypes []*gen.GoalType
	for _, goalType := range goalTypes {
		pbGoalType := &gen.GoalType{
			GoalTypeId:   goalType.GoalTypeID,
			GoalTypeName: goalType.GoalTypeName,
		}
		pbGoalTypes = append(pbGoalTypes, pbGoalType)
	}

	// Return a GoalTypeResponse with the GoalTypes
	return &gen.GoalTypeResponse{
		Data:    pbGoalTypes,
		Message: "Successfully retrieved all goal types",
	}, nil
}

func (e *MatchServicePublic) GetAllCardType(ctx context.Context, request *gen.EmptyRequest) (*gen.CardTypeResponse, error) {
	// Use the matchDao to get all CardTypes from the database
	cardTypes, err := e.matchDao.GetAllCardType()
	if err != nil {
		return nil, fmt.Errorf("failed to get all card types: %w", err)
	}

	// Convert the CardTypes to the protobuf CardType
	var pbCardTypes []*gen.CardType
	for _, cardType := range cardTypes {
		pbCardType := &gen.CardType{
			CardTypeId:   cardType.CardTypeID,
			CardTypeName: cardType.CardTypeName,
		}
		pbCardTypes = append(pbCardTypes, pbCardType)
	}

	// Return a CardTypeResponse with the CardTypes
	return &gen.CardTypeResponse{
		Data:    pbCardTypes,
		Message: "Successfully retrieved all card types",
	}, nil
}
