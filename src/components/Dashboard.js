import React, { useEffect, useState } from 'react';
import { FaDatabase, FaFileUpload, FaPlus, FaDownload, FaCog, FaSearch } from 'react-icons/fa';
const url = "https://meridian-backend-postdeployment-testing.onrender.com";

const Dashboard = () => {
  // State for document count
  const [documentCount, setDocumentCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);
  const [errorCount, setErrorCount] = useState(null);
  
  // State for recent activity (user queries)
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [errorActivity, setErrorActivity] = useState(null);
  
  // State for query counts and filtered queries
  const [queryCounts, setQueryCounts] = useState({ success_count: 0, failure_count: 0 });
  const [filteredQueries, setFilteredQueries] = useState({ success_queries: [], failure_queries: [] });
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [errorQueries, setErrorQueries] = useState(null);

  useEffect(() => {
    // Fetch document count from API
    fetch(`${url}/admin/document-count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDocumentCount(data.count);
        setLoadingCount(false);
      })
      .catch((err) => {
        setErrorCount(err.message);
        setLoadingCount(false);
      });

    // Fetch query counts
    fetch(`${url}/query_counts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch query counts');
        }
        return response.json();
      })
      .then((data) => {
        setQueryCounts(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch filtered queries
    fetch(`${url}/filter_queries`)
      .then((response) => {
        if (!response.ok) {
          // Log the response to help with debugging.
          console.error("Filtered queries response not OK", response);
          throw new Error('Failed to fetch filtered queries');
        }
        return response.json();
      })
      .then((data) => {
        setFilteredQueries(data);
        setLoadingQueries(false);
      })
      .catch((err) => {
        console.error("Error fetching filtered queries:", err);
        setErrorQueries(err.message);
        setLoadingQueries(false);
      });

    // Fetch recent activity (user queries)
    fetch(`${url}/get_queries`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }
        return response.json();
      })
      .then(data => {
        // Sort by ID in descending order to get the most recent ones
        const sortedData = data.sort((a, b) => (b.id || 0) - (a.id || 0));
        // Take only the first 3 (most recent)
        const recentQueries = sortedData.slice(0, 3).map(query => ({
          id: query.id,
          event: "Query",
          queryText: query.query || 'N/A',
          time: formatTimestamp(query.timestamp) || 'Recently'
        }));
        setRecentActivity(recentQueries);
        setLoadingActivity(false);
      })
      .catch(err => {
        setErrorActivity(err.message);
        setLoadingActivity(false);
      });
  }, []);

  // Helper function to format timestamps - if we have actual timestamps in the data
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    // This is a placeholder - adjust based on your actual timestamp format
    const now = new Date();
    const queryTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - queryTime) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  };
  
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minWidth: '300px',
    marginBottom: '20px'
  };
  
  const titleStyle = {
    fontSize: '24px',
    marginBottom: '10px'
  };
  
  const countStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333'
  };
  
  const dashboardRowStyle = {
    display: 'flex',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px'
  };
  
  const panelStyle = {
    flex: 1,
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  const panelHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };
  
  const actionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '10px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#eee',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      {/* Document Count Card */}
      <div style={cardStyle}>
        <div style={titleStyle}>Document Count</div>
        {loadingCount ? (
          <p>Loading...</p>
        ) : errorCount ? (
          <p style={{ color: 'red' }}>Error: {errorCount}</p>
        ) : (
          <div style={countStyle}>{documentCount}</div>
        )}
      </div>
      
      {/* Dashboard Row */}
      <div className="dashboard-row" style={dashboardRowStyle}>
        {/* Recent Activity Panel */}
        <div className="activity-panel" style={panelStyle}>
          <div className="panel-header" style={panelHeaderStyle}>
            <h3>Recent Queries</h3>
            <button 
              className="view-all-btn" 
              style={{ padding: '5px 10px', cursor: 'pointer' }}
              onClick={() => window.location.href = '/activity'}
            >
              View All
            </button>
          </div>
          <div className="activity-list">
            {loadingActivity ? (
              <p>Loading recent queries...</p>
            ) : errorActivity ? (
              <p style={{ color: 'red' }}>Error: {errorActivity}</p>
            ) : recentActivity.length > 0 ? (
              recentActivity.map(activity => (
                <div
                  className="activity-item"
                  key={activity.id}
                  style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}
                >
                  <div className="activity-icon" style={{ marginRight: '10px' }}>
                    <FaSearch />
                  </div>
                  <div className="activity-details" style={{ flex: 1, overflow: 'hidden' }}>
                    <p className="activity-event" style={{ margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {activity.queryText}
                    </p>
                    <p className="activity-meta" style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      <span className="activity-time">{activity.time}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-activity">
                <p>No recent queries found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Query Statistics Cards */}
        <div className="query-cards" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Successful Queries Card */}
          <div style={cardStyle}>
            <div style={titleStyle}>Successful Queries</div>
            {queryCounts.success_count !== undefined ? (
              <div style={countStyle}>{queryCounts.success_count}</div>
            ) : (
              <p>No data</p>
            )}
          </div>
          {/* Failed Queries Card */}
          <div style={cardStyle}>
            <div style={titleStyle}>Failed Queries</div>
            {queryCounts.failure_count !== undefined ? (
              <div style={countStyle}>{queryCounts.failure_count}</div>
            ) : (
              <p>No data</p>
            )}
          </div>
          {errorQueries && (
            <p style={{ color: 'red', textAlign: 'center' }}>Error: {errorQueries}</p>
          )}
        </div>
        
        {/* Quick Actions Panel */}
        <div className="quick-actions" style={panelStyle}>
          <div className="panel-header" style={{ ...panelHeaderStyle, justifyContent: 'flex-start' }}>
            <h3>Quick Actions</h3>
          </div>
          <div className="action-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              className="action-btn"
              onClick={() => window.location.href = '/knowledge'}
              style={actionButtonStyle}
            >
              <FaFileUpload />
              <span>Upload Files</span>
            </button>
            <button
              className="action-btn"
              onClick={() => window.location.href = '/knowledge'}
              style={actionButtonStyle}
            >
              <FaPlus />
              <span>Add Document</span>
            </button>
            <button
              className="action-btn"
              style={actionButtonStyle}
            >
              <FaDownload />
              <span>Export Data</span>
            </button>
            <button
              className="action-btn"
              onClick={() => window.location.href = '/settings'}
              style={actionButtonStyle}
            >
              <FaCog />
              <span>Configure Bot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
