// import React, { useEffect, useState } from 'react';
// import { FaDatabase, FaFileUpload, FaPlus, FaDownload, FaCog } from 'react-icons/fa';

// const url = "https://meridian-chatbot.onrender.com";

// const Dashboard = () => {
//   // State for document count
//   const [documentCount, setDocumentCount] = useState(0);
//   const [loadingCount, setLoadingCount] = useState(true);
//   const [errorCount, setErrorCount] = useState(null);

//   // State for recent activity
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     // Fetch document count from API
//     fetch(`${url}/admin/document-count`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setDocumentCount(data.count);
//         setLoadingCount(false);
//       })
//       .catch((err) => {
//         setErrorCount(err.message);
//         setLoadingCount(false);
//       });

//     // Simulate fetching recent activity data
//     // Replace with an actual fetch call if you have an endpoint
//     const sampleActivity = [
//       { id: 1, event: "Uploaded a file", user: "Nihil", time: "2 hours ago" },
//       { id: 2, event: "Added a document", user: "Nikhil", time: "3 hours ago" },
//       { id: 3, event: "Uploaded a file", user: "Nikhil", time: "1 day ago" },
//     ];
//     setRecentActivity(sampleActivity);
//   }, []);

//   // Inline styles for the Document Count card container
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f5f5f5',
//     fontFamily: 'Arial, sans-serif',
//     padding: '20px'
//   };

//   const cardStyle = {
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     padding: '20px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     textAlign: 'center',
//     minWidth: '300px',
//     marginBottom: '20px'
//   };

//   const titleStyle = {
//     fontSize: '24px',
//     marginBottom: '10px'
//   };

//   const countStyle = {
//     fontSize: '48px',
//     fontWeight: 'bold',
//     color: '#333'
//   };

//   // Dashboard row container style
//   const dashboardRowStyle = {
//     display: 'flex',
//     gap: '20px',
//     width: '100%',
//     maxWidth: '1200px'
//   };

//   // Panel style (for both activity and quick actions)
//   const panelStyle = {
//     flex: 1,
//     background: '#fff',
//     borderRadius: '8px',
//     padding: '20px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//   };

//   const panelHeaderStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px'
//   };

//   const actionButtonStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '5px',
//     padding: '10px',
//     cursor: 'pointer',
//     border: 'none',
//     backgroundColor: '#eee',
//     borderRadius: '4px'
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Document Count Card */}
//       <div style={cardStyle}>
//         <div style={titleStyle}>Document Count</div>
//         {loadingCount ? (
//           <p>Loading...</p>
//         ) : errorCount ? (
//           <p style={{ color: 'red' }}>Error: {errorCount}</p>
//         ) : (
//           <div style={countStyle}>{documentCount}</div>
//         )}
//       </div>

//       {/* Dashboard Row */}
//       <div className="dashboard-row" style={dashboardRowStyle}>
//         {/* Recent Activity Panel */}
//         <div className="activity-panel" style={panelStyle}>
//           <div className="panel-header" style={panelHeaderStyle}>
//             <h3>Recent Activity</h3>
//             <button className="view-all-btn" style={{ padding: '5px 10px', cursor: 'pointer' }}>
//               View All
//             </button>
//           </div>
//           <div className="activity-list">
//             {recentActivity.length > 0 ? (
//               recentActivity.map(activity => (
//                 <div
//                   className="activity-item"
//                   key={activity.id}
//                   style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}
//                 >
//                   <div className="activity-icon" style={{ marginRight: '10px' }}>
//                     <FaDatabase />
//                   </div>
//                   <div className="activity-details">
//                     <p className="activity-event" style={{ margin: 0 }}>{activity.event}</p>
//                     <p className="activity-meta" style={{ margin: 0, fontSize: '12px', color: '#666' }}>
//                       <span className="activity-user">{activity.user}</span> | <span className="activity-time">{activity.time}</span>
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="empty-activity">
//                 <p>No recent activity found</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Actions Panel */}
//         <div className="quick-actions" style={panelStyle}>
//           <div className="panel-header" style={{ ...panelHeaderStyle, justifyContent: 'flex-start' }}>
//             <h3>Quick Actions</h3>
//           </div>
//           <div className="action-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//             <button
//               className="action-btn"
//               onClick={() => window.location.href = '/knowledge'}
//               style={actionButtonStyle}
//             >
//               <FaFileUpload />
//               <span>Upload Files</span>
//             </button>
//             <button
//               className="action-btn"
//               onClick={() => window.location.href = '/knowledge'}
//               style={actionButtonStyle}
//             >
//               <FaPlus />
//               <span>Add Document</span>
//             </button>
//             <button
//               className="action-btn"
//               style={actionButtonStyle}
//             >
//               <FaDownload />
//               <span>Export Data</span>
//             </button>
//             <button
//               className="action-btn"
//               onClick={() => window.location.href = '/settings'}
//               style={actionButtonStyle}
//             >
//               <FaCog />
//               <span>Configure Bot</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { FaDatabase, FaFileUpload, FaPlus, FaDownload, FaCog } from 'react-icons/fa';

const url = "https://meridian-chabot-dashboard.onrender.com";

const Dashboard = () => {
  // State for document count
  const [documentCount, setDocumentCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);
  const [errorCount, setErrorCount] = useState(null);

  // State for recent activity
  const [recentActivity, setRecentActivity] = useState([]);

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

    // Simulate fetching recent activity data
    const sampleActivity = [
      { id: 1, event: "Uploaded a file", user: "Nihil", time: "2 hours ago" },
      { id: 2, event: "Added a document", user: "Nikhil", time: "3 hours ago" },
      { id: 3, event: "Uploaded a file", user: "Nikhil", time: "1 day ago" },
    ];
    setRecentActivity(sampleActivity);
  }, []);

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
            <h3>Recent Activity</h3>
            <button className="view-all-btn" style={{ padding: '5px 10px', cursor: 'pointer' }}>
              View All
            </button>
          </div>
          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.map(activity => (
                <div
                  className="activity-item"
                  key={activity.id}
                  style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}
                >
                  <div className="activity-icon" style={{ marginRight: '10px' }}>
                    <FaDatabase />
                  </div>
                  <div className="activity-details">
                    <p className="activity-event" style={{ margin: 0 }}>{activity.event}</p>
                    <p className="activity-meta" style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      <span className="activity-user">{activity.user}</span> | <span className="activity-time">{activity.time}</span>
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
