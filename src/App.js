import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { FaCog, FaDatabase, FaChartBar, FaUser, FaSignOutAlt } from "react-icons/fa";
import Dashboard from "./components/Dashboard";
import KnowledgeBase from "./components/KnowledgeBase";
import Settings from "./components/Settings";
import "./App.css";
import RecentActivity from "./components/RecentActivity";

// Sidebar Component
const Sidebar = () => {
  const user = {
    name: "Nikhil Bansal",
    role: "Administrator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">AI Chatbot</h1>
        <p className="app-subtitle">Admin Panel</p>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaChartBar className="nav-icon" /> 
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/knowledge" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaDatabase className="nav-icon" /> 
          <span>Knowledge Base</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaCog className="nav-icon" /> 
          <span>Settings</span>
        </NavLink>
        <NavLink to="/recentActivity" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <FaUser className="nav-icon" /> 
          <span>Recent Activity</span>
        </NavLink>

      </nav>
      
      <div className="user-profile">
        <div className="avatar-container">
          <img src={user.avatar} alt="Profile" className="user-avatar" />
        </div>
        <div className="user-details">
          <p className="username">{user.name}</p>
          <p className="user-role">{user.role}</p>
        </div>
        <button className="logout-btn">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [fileCount, setFileCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);


 

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard fileCount={fileCount} folderCount={folderCount} />} />
            <Route path="/knowledge" element={<KnowledgeBase setFileCount={setFileCount} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recentActivity" element={<RecentActivity />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;