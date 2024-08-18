import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Schedule = () => {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [clubList, setClubList] = useState([]);
  const [clubOneName, setClubOneName] = useState("");
  const [clubTwoName, setClubTwoName] = useState("");
  const [intendTime, setIntendTime] = useState("");
  const [realTime, setRealTime] = useState("");
  const [matchRound, setMatchRound] = useState("");
  const [matchTurn, setMatchTurn] = useState("");
  const [stadium, setStadium] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  const accessToken = useSelector((state) => state.user.accessToken);

  // Fetch club list for selected season
  useEffect(() => {
    if (selectedSeason) {
      axios
        .get(`http://localhost:8888/club-list/${selectedSeason}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setClubList(response.data.data || []);
        })
        .catch((error) => {
          console.error("Error fetching club list:", error);
        });
    }
  }, [selectedSeason, accessToken]);

  const handleScheduleMatch = () => {
    if (
      !selectedSeason ||
      !clubOneName ||
      !clubTwoName ||
      !intendTime ||
      !matchRound ||
      !matchTurn
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const newMatch = {
      club_one_name: clubOneName,
      club_two_name: clubTwoName,
      intend_time: intendTime,
      match_round: matchRound,
      match_turn: matchTurn,
      stadium: stadium, // Ensure the stadium is included in the new match object
    };

    axios
      .post(
        `http://localhost:8888/match/calendar/${selectedSeason}`,
        JSON.stringify(newMatch),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Match scheduled successfully:", response.data);
        setSchedule([...schedule, response.data]);
        setClubOneName("");
        setClubTwoName("");
        setIntendTime("");
        setRealTime("");
        setMatchRound("");
        setMatchTurn("");
        setStadium("");
        setError(null);
      })
      .catch((error) => {
        console.error("Error scheduling match:", error);
        setError("Error scheduling match. Please try again later.");
      });
  };


  const handleIntendTimeChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace("T", " ");
    setIntendTime(formattedValue);
    setRealTime(formattedValue);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    if (selectedSeason) {
      axios
        .get(`http://localhost:8888/match/calendar/${selectedSeason}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setSchedule(response.data.matches || []);
        })
        .catch((error) => {
          console.error("Error fetching match calendar:", error);
        });
    }
  }, [selectedSeason, accessToken]);

  return (
    <div className="container-IP">
      <h1 className="header-IP">Lập Lịch Thi Đấu</h1>

      <label className="label-IP">
        Chọn Mùa:
        <select
          className="select-IP"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="">Chọn Mùa</option>
          <option value="2021-2022">2021-2022</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
        </select>
      </label>

      <label className="label-IP">
        Đội 1:
        <select
          className="select-IP"
          value={clubOneName}
          onChange={(e) => {
            setClubOneName(e.target.value);
            const selectedClub = clubList.find(club => club.nameClub === e.target.value);
            if (selectedClub) {
              setStadium(selectedClub.nameStadium);
            }
          }}
        >
          <option value="">Chọn Đội</option>
          {clubList.map((club, index) => (
            <option key={index} value={club.nameClub}>
              {club.nameClub}
            </option>
          ))}
        </select>
      </label>

      <label className="label-IP">
        Đội 2:
        <select
          className="select-IP"
          value={clubTwoName}
          onChange={(e) => setClubTwoName(e.target.value)}
        >
          <option value="">Chọn Đội</option>
          {clubList.map((club, index) => (
            <option key={index} value={club}>
              {club.nameClub}
            </option>
          ))}
        </select>
      </label>
      <datalist id="club-list">
        {clubList.map((club, index) => (
          <option key={index} value={club}/>
        ))}
      </datalist>

      <label className="label-IP">
        Thời Gian Dự Kiến:
        <input
          className="input-IP"
          type="datetime-local"
          value={intendTime.replace(" ", "T")}
          onChange={handleIntendTimeChange}
        />
      </label>
      <label className="label-IP">
        Thời Gian Thực:
        <input
          className="input-IP"
          type="datetime-local"
          value={realTime.replace(" ", "T")}
          readOnly
        />
      </label>
      <label className="label-IP">
        Vòng Đấu:
        <input
          className="input-IP"
          type="text"
          value={matchRound}
          onChange={(e) => setMatchRound(e.target.value)}
        />
      </label>
      <label className="label-IP">
        Lượt Đấu:
        <input
          className="input-IP"
          type="text"
          value={matchTurn}
          onChange={(e) => setMatchTurn(e.target.value)}
        />
      </label>
      <label className="label-IP">
        Sân Vận Động:
        <input
          className="input-IP"
          type="text"
          value={stadium}
          readOnly
        />
      </label>
      <button className="button-IP" onClick={handleScheduleMatch}>
        Lập Lịch
      </button>
      {error && <p className="error-IP">{error}</p>}

      <h2 className="header-IP">Lịch Thi Đấu</h2>
      <ul className="schedule-list-IP">
        {Array.isArray(schedule) && schedule.length > 0 ? (
          schedule.map((match, index) => (
            <li key={index} className="match-item-IP">
              <div>
                <strong>Đội 1:</strong> {match.clubOneName}
              </div>
              <div>
                <strong>Đội 2:</strong> {match.clubTwoName}
              </div>
              <div>
                <strong>Thời Gian Dự Kiến:</strong> {formatDateTime(match.intendTime)}
              </div>
              <div>
                <strong>Thời Gian Thực:</strong> {formatDateTime(match.realTime)}
              </div>
              <div>
                <strong>Vòng Đấu:</strong> {match.matchRound}
              </div>
              <div>
                <strong>Lượt Đấu:</strong> {match.matchTurn}
              </div>
              <div>
                <strong>Sân Vận Động:</strong> {match.stadium}
              </div>
            </li>
          ))
        ) : (
          <li>Không có trận đấu nào được lên lịch.</li>
        )}
      </ul>
    </div>
  );
};

export default Schedule;
