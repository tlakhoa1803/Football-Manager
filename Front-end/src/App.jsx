import React from 'react';
import './App.css';
import HomePage from './Components/HomePage/HomePage.jsx';
import LeagueTable from './Components/Ranking/LeagueTable.jsx';
import Header from './Components/HomePage/Header.jsx';
import Footer from './Components/HomePage/Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MatchPage from './Components/Progess_Goal/MatchPage.jsx';
import TeamGrid from './Components/ClubInfo/TeamGrid.jsx';
import TableTeam from './Components/TeamInfo/TableTeam.jsx';
import Player from './Components/Player/Players.jsx';
import Paper from './Components/Paper/Paper.jsx';
import MainNews from './Components/Paper/MainNews.jsx';
import FirstNews from './Components/Paper/FirstNews.jsx';
import SecondNews from './Components/Paper/SecondNews.jsx';
import ThirdNews from './Components/Paper/ThirdNews.jsx';
import Summarize from './Components/Paper/Sumarize.jsx';
import Schedule from './Components/MatchSchedule/Schedule.jsx';
import LoginPage from './Components/Auth/Sign-in/LoginPage';
import AdminDashboard from './Components/Auth/AdminDashboard';
import {Provider} from "react-redux";
import ManagerDashboard from "./Components/Auth/ManagerDashboard";
import SignupPage from './Components/Auth/Sign-up/SignupPage.jsx'
import {store} from './store';
import ProfilePage from "./Components/Auth/Sign-in/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import SignIn from "./Components/Auth/Sign-in/LoginPage";

const App = () => {
  return (
    <Router>
      <div>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/league-table" element={<LeagueTable />} />
            <Route path="/team" element={<TeamGrid />} />
            <Route path="/team/:id" element={<TableTeam />} />
            <Route path="/match/:id" element={<MatchPage />} />
            <Route path="/player/:playerId" element={<Player />} />
            <Route path="/match" element={<Schedule />} />
            <Route path="/tin-tuc" element={<Paper />} />
            <Route path="/main-news" element={<MainNews />} />
            <Route path="/first-news" element={<FirstNews />} />
            <Route path="/second-news" element={<SecondNews />} />
            <Route path="/third-news" element={<ThirdNews />} />
            <Route path="/sumarize" element={<Summarize />} />
            <Route path="/sign-up" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
            <Route path="/manager-dashboard" element={<PrivateRoute role="user"><ManagerDashboard /></PrivateRoute>} />
          </Routes>
          <Footer />
        </Provider>
      </div>
    </Router>
  );
};

export default App;