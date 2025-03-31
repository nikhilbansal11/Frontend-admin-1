import React, { useState, useEffect } from "react";
import { FaDatabase, FaChartBar, FaFolder, FaFile, FaBell, FaEllipsisV, FaSearch, FaFileUpload, FaPlus, FaDownload, FaCog } from "react-icons/fa";
import { dashboardApi, testConnection } from "../services/apiService";
import "../App.css";

const Dashboard = ({ fileCount, folderCount }) => {
  const [dashboardData, setDashboardData] = useState({
    totalDocuments: 0,
    totalChunks: 0,
    documentsByDomain: {},
    availablePrompts: [],
    recentDocuments: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("checking");

  // Sample analytics data (this could be replaced with real backend data later)
  const analytics = {
    totalQueries: 2457,
    successRate: 92,
    activeUsers: 324,
    avgResponseTime: "1.2s"
  };

  useEffect(() => {
    checkConnectionAndFetchData();
  }, []);

  const checkConnectionAndFetchData = async () => {
    try {
      setConnectionStatus("checking");
      setLoading(true);
      
      // Test connection to backend
      const connectionTest = await testConnection();
      console.log("Connection test result:", connectionTest);
      
      if (connectionTest.success) {
        setConnectionStatus("connected");
        await fetchDashboardData();
      } else {
        setConnectionStatus("failed");
        setError(`Cannot connect to backend: ${connectionTest.status} ${connectionTest.statusText || connectionTest.error}`);
        setLoading(false);
      }
    } catch (err) {
      console.error("Connection check error:", err);
      setConnectionStatus("failed");
      setError(`Error connecting to backend: ${err.message}`);
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      
      const data = await dashboardApi.getDashboardData();
      console.log('Dashboard data received:', data);
      
      setDashboardData({
        totalDocuments: data.total_documents || 0,
        totalChunks: data.total_chunks || 0,
        documentsByDomain: data.documents_by_domain || {},
        availablePrompts: data.available_prompts || [],
        recentDocuments: data.recent_documents || []
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  // Format recent activity from recent documents
  const recentActivity = dashboardData.recentDocuments.map((doc, index) => ({
    id: index,
    event: `Document "${doc.doc_name}" added`,
    time: new Date(doc.upload_time).toLocaleString(),
    user: "Admin"
  }));

  if (loading && connectionStatus !== "failed") {
    return (
      <div className="content loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <div className="header-actions">
          {connectionStatus === "connected" && (
            <span className="connection-status connected">
              Connected to backend
            </span>
          )}
          
          {connectionStatus === "checking" && (
            <span className="connection-status checking">
              Checking connection...
            </span>
          )}
          
          {connectionStatus === "failed" && (
            <span className="connection-status failed">
              Backend connection failed
            </span>
          )}
          <button className="header-btn notification-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          <button className="header-btn">
            <FaEllipsisV />
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={checkConnectionAndFetchData}>Try Again</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon folder">
            <FaFolder />
          </div>
          <div className="stat-details">
            <h3 className="stat-count">{folderCount || 0}</h3>
            <p className="stat-label">Folders</p>
          </div>
          <div className="stat-percentage increase">+12%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon file">
            <FaFile />
          </div>
          <div className="stat-details">
            <h3 className="stat-count">{connectionStatus === "connected" ? dashboardData.totalDocuments : fileCount}</h3>
            <p className="stat-label">Documents</p>
          </div>
          <div className="stat-percentage increase">+8%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon queries">
            <FaSearch />
          </div>
          <div className="stat-details">
            <h3 className="stat-count">{analytics.totalQueries}</h3>
            <p className="stat-label">Total Queries</p>
          </div>
          <div className="stat-percentage increase">+24%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaChartBar />
          </div>
          <div className="stat-details">
            <h3 className="stat-count">{analytics.successRate}%</h3>
            <p className="stat-label">Success Rate</p>
          </div>
          <div className="stat-percentage increase">+3%</div>
        </div>
      </div>

      {connectionStatus === "connected" && (
        <>
          <div className="dashboard-row">
            <div className="activity-panel">
              <div className="panel-header">
                <h3>Recent Activity</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map(activity => (
                    <div className="activity-item" key={activity.id}>
                      <div className="activity-icon">
                        <FaDatabase />
                      </div>
                      <div className="activity-details">
                        <p className="activity-event">{activity.event}</p>
                        <p className="activity-meta">
                          <span className="activity-user">{activity.user}</span>
                          <span className="activity-time">{activity.time}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-activity">
                    <p>No recent activity found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="quick-actions">
              <div className="panel-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => window.location.href = '/knowledge'}>
                  <FaFileUpload />
                  <span>Upload Files</span>
                </button>
                <button className="action-btn" onClick={() => window.location.href = '/knowledge'}>
                  <FaPlus />
                  <span>Add Document</span>
                </button>
                <button className="action-btn">
                  <FaDownload />
                  <span>Export Data</span>
                </button>
                <button className="action-btn" onClick={() => window.location.href = '/settings'}>
                  <FaCog />
                  <span>Configure Bot</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Domain Statistics */}
          {Object.keys(dashboardData.documentsByDomain).length > 0 && (
            <div className="domain-stats-panel">
              <div className="panel-header">
                <h3>Documents by Domain</h3>
              </div>
              <div className="domain-stats-grid">
                {Object.entries(dashboardData.documentsByDomain).map(([domain, stats]) => (
                  <div className="domain-stat-card" key={domain}>
                    <h4 className="domain-name">{domain}</h4>
                    <div className="domain-stats">
                      <div className="domain-stat">
                        <span className="stat-value">{stats.count}</span>
                        <span className="stat-label">Documents</span>
                      </div>
                      <div className="domain-stat">
                        <span className="stat-value">{stats.chunks}</span>
                        <span className="stat-label">Chunks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;