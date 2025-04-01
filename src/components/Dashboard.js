// import React, { useEffect, useState } from 'react';
// import { FaDatabase, FaFileUpload, FaPlus, FaDownload, FaCog, FaSearch } from 'react-icons/fa';
// const url = "https://meridian-backend-postdeployment-testing.onrender.com";

// const Dashboard = () => {
//   // State for document count
//   const [documentCount, setDocumentCount] = useState(0);
//   const [loadingCount, setLoadingCount] = useState(true);
//   const [errorCount, setErrorCount] = useState(null);
  
//   // State for recent activity (user queries)
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loadingActivity, setLoadingActivity] = useState(true);
//   const [errorActivity, setErrorActivity] = useState(null);
  
//   // State for query counts and filtered queries
//   const [queryCounts, setQueryCounts] = useState({ success_count: 0, failure_count: 0 });
//   const [filteredQueries, setFilteredQueries] = useState({ success_queries: [], failure_queries: [] });
//   const [loadingQueries, setLoadingQueries] = useState(true);
//   const [errorQueries, setErrorQueries] = useState(null);

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

//     // Fetch query counts
//     fetch(`${url}/query_counts`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch query counts');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setQueryCounts(data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });

//     // Fetch filtered queries
//     fetch(`${url}/filter_queries`)
//       .then((response) => {
//         if (!response.ok) {
//           // Log the response to help with debugging.
//           console.error("Filtered queries response not OK", response);
//           throw new Error('Failed to fetch filtered queries');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setFilteredQueries(data);
//         setLoadingQueries(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching filtered queries:", err);
//         setErrorQueries(err.message);
//         setLoadingQueries(false);
//       });

//     // Fetch recent activity (user queries)
//     fetch(`${url}/get_queries`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch queries");
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Sort by ID in descending order to get the most recent ones
//         const sortedData = data.sort((a, b) => (b.id || 0) - (a.id || 0));
//         // Take only the first 3 (most recent)
//         const recentQueries = sortedData.slice(0, 3).map(query => ({
//           id: query.id,
//           event: "Query",
//           queryText: query.query || 'N/A',
//           time: formatTimestamp(query.timestamp) || 'Recently'
//         }));
//         setRecentActivity(recentQueries);
//         setLoadingActivity(false);
//       })
//       .catch(err => {
//         setErrorActivity(err.message);
//         setLoadingActivity(false);
//       });
//   }, []);

//   // Helper function to format timestamps - if we have actual timestamps in the data
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return 'Recently';
    
//     // This is a placeholder - adjust based on your actual timestamp format
//     const now = new Date();
//     const queryTime = new Date(timestamp);
//     const diffInSeconds = Math.floor((now - queryTime) / 1000);
    
//     if (diffInSeconds < 60) return 'Just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
//     return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   // Inline styles
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
  
//   const dashboardRowStyle = {
//     display: 'flex',
//     gap: '20px',
//     width: '100%',
//     maxWidth: '1200px'
//   };
  
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
//             <h3>Recent Queries</h3>
//             <button 
//               className="view-all-btn" 
//               style={{ padding: '5px 10px', cursor: 'pointer' }}
//               onClick={() => window.location.href = '/activity'}
//             >
//               View All
//             </button>
//           </div>
//           <div className="activity-list">
//             {loadingActivity ? (
//               <p>Loading recent queries...</p>
//             ) : errorActivity ? (
//               <p style={{ color: 'red' }}>Error: {errorActivity}</p>
//             ) : recentActivity.length > 0 ? (
//               recentActivity.map(activity => (
//                 <div
//                   className="activity-item"
//                   key={activity.id}
//                   style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}
//                 >
//                   <div className="activity-icon" style={{ marginRight: '10px' }}>
//                     <FaSearch />
//                   </div>
//                   <div className="activity-details" style={{ flex: 1, overflow: 'hidden' }}>
//                     <p className="activity-event" style={{ margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                       {activity.queryText}
//                     </p>
//                     <p className="activity-meta" style={{ margin: 0, fontSize: '12px', color: '#666' }}>
//                       <span className="activity-time">{activity.time}</span>
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="empty-activity">
//                 <p>No recent queries found</p>
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Query Statistics Cards */}
//         <div className="query-cards" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//           {/* Successful Queries Card */}
//           <div style={cardStyle}>
//             <div style={titleStyle}>Successful Queries</div>
//             {queryCounts.success_count !== undefined ? (
//               <div style={countStyle}>{queryCounts.success_count}</div>
//             ) : (
//               <p>No data</p>
//             )}
//           </div>
//           {/* Failed Queries Card */}
//           <div style={cardStyle}>
//             <div style={titleStyle}>Failed Queries</div>
//             {queryCounts.failure_count !== undefined ? (
//               <div style={countStyle}>{queryCounts.failure_count}</div>
//             ) : (
//               <p>No data</p>
//             )}
//           </div>
//           {errorQueries && (
//             <p style={{ color: 'red', textAlign: 'center' }}>Error: {errorQueries}</p>
//           )}
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
import { FaDatabase, FaFileUpload, FaPlus, FaDownload, FaCog, FaSearch, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

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

  // Enhanced styles with gradients and modern look
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '30px 20px',
    color: '#2c3e50'
  };
  
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.12)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.18)',
    width: '100%',
    marginBottom: '25px',
    position: 'relative',
    overflow: 'hidden'
  };
  
  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    position: 'relative',
    display: 'inline-block'
  };
  
  const countStyle = {
    fontSize: '42px',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    marginBottom: '5px'
  };
  
  const dashboardRowStyle = {
    display: 'flex',
    gap: '25px',
    width: '100%',
    maxWidth: '1300px',
    flexWrap: 'wrap'
  };
  
  const panelStyle = {
    flex: '1 1 300px',
    background: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.12)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.18)',
    minHeight: '300px'
  };
  
  const panelHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #f0f4f8',
    paddingBottom: '15px'
  };
  
  const actionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#2c3e50',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: 'calc(50% - 5px)',
    justifyContent: 'center'
  };
  
  const viewAllButtonStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  };
  
  const activityItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
    background: '#f9fafc',
    border: '1px solid #edf2f7'
  };
  
  const successCardStyle = {
    ...cardStyle,
    position: 'relative',
    overflow: 'hidden'
  };
  
  const failureCardStyle = {
    ...cardStyle,
    position: 'relative',
    overflow: 'hidden'
  };
  
  const iconContainerStyle = {
    marginRight: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#3a7bd5'
  };
  
  const headingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
    background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };
  
  // const dashboardHeaderStyle = {
  //   width: '100%',
  //   maxWidth: '1300px',
  //   marginBottom: '30px',
  //   textAlign: 'left'
  // };
  
  // const pageHeaderStyle = {
  //   fontSize: '28px',
  //   fontWeight: '700',
  //   margin: '0 0 10px 0',
  //   color: '#2c3e50'
  // };
  
  // const subheaderStyle = {
  //   fontSize: '16px',
  //   fontWeight: '400',
  //   color: '#64748b',
  //   margin: '0'
  // };

  const dashboardHeaderStyle = {
    width: '100%',
    maxWidth: '1000px',
    marginBottom: '30px',
    textAlign: 'center', // Center text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh', // Full viewport height
    margin: 'auto' // Center horizontally
};

const pageHeaderStyle = {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 10px 0',
    color: '#2c3e50'
};

const subheaderStyle = {
    fontSize: '16px',
    fontWeight: '400',
    color: '#64748b',
    margin: '0'
};


  return (
    <div style={containerStyle}>
      {/* Dashboard Header */}
      <div style={dashboardHeaderStyle}>
        <h1 style={pageHeaderStyle}>Analytics Dashboard</h1>
        <p style={subheaderStyle}>Monitor your system's performance and user interactions</p>
      </div>
      
      {/* Document Count Card */}
      <div style={{...cardStyle, maxWidth: '1300px'}}>
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
          color: 'white'
        }}>
          <FaDatabase size={18} />
        </div>
        <div style={titleStyle}>Total Documents</div>
        {loadingCount ? (
          <p>Loading...</p>
        ) : errorCount ? (
          <p style={{ color: '#e53e3e' }}>Error: {errorCount}</p>
        ) : (
          <>
            <div style={countStyle}>{documentCount}</div>
            <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '14px' }}>Documents in your knowledge base</p>
          </>
        )}
      </div>
      
      {/* Dashboard Row */}
      <div className="dashboard-row" style={dashboardRowStyle}>
        {/* Recent Activity Panel */}
        <div className="activity-panel" style={{...panelStyle, flex: '1.5 1 400px'}}>
          <div className="panel-header" style={panelHeaderStyle}>
            <h3 style={headingStyle}>Recent Queries</h3>
            <button 
              className="view-all-btn" 
              style={viewAllButtonStyle}
              onClick={() => window.location.href = '/recentActivity'}
            >
              View All
            </button>
          </div>
          <div className="activity-list">
            {loadingActivity ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
                <p>Loading recent queries...</p>
              </div>
            ) : errorActivity ? (
              <div style={{ color: '#e53e3e', padding: '20px', textAlign: 'center', background: '#fff5f5', borderRadius: '8px' }}>
                <FaExclamationTriangle style={{ marginRight: '8px' }} />
                Error: {errorActivity}
              </div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map(activity => (
                <div
                  className="activity-item"
                  key={activity.id}
                  style={activityItemStyle}
                >
                  <div className="activity-icon" style={iconContainerStyle}>
                    <FaSearch size={16} />
                  </div>
                  <div className="activity-details" style={{ flex: 1, overflow: 'hidden' }}>
                    <p className="activity-event" style={{ margin: '0 0 5px', fontWeight: '500', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {activity.queryText}
                    </p>
                    <p className="activity-meta" style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      <span className="activity-time">{activity.time}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-activity" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                <p>No recent queries found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Query Statistics Cards */}
        <div className="query-cards" style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: '1 1 300px' }}>
          {/* Successful Queries Card */}
          <div style={successCardStyle}>
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
              color: 'white'
            }}>
              <FaChartLine size={18} />
            </div>
            <div style={{...titleStyle, marginTop: '10px'}}>Successful Queries</div>
            {queryCounts.success_count !== undefined ? (
              <>
                <div style={{...countStyle, background: 'linear-gradient(45deg, #43e97b, #38f9d7)'}}>
                  {queryCounts.success_count}
                </div>
                <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '14px' }}>Total successful interactions</p>
              </>
            ) : (
              <p>No data</p>
            )}
          </div>
          
          {/* Failed Queries Card */}
          <div style={failureCardStyle}>
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #fa709a, #fee140)',
              color: 'white'
            }}>
              <FaExclamationTriangle size={18} />
            </div>
            <div style={{...titleStyle, marginTop: '10px'}}>Failed Queries</div>
            {queryCounts.failure_count !== undefined ? (
              <>
                <div style={{...countStyle, background: 'linear-gradient(45deg, #fa709a, #fee140)'}}>
                  {queryCounts.failure_count}
                </div>
                <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '14px' }}>Total failed interactions</p>
              </>
            ) : (
              <p>No data</p>
            )}
          </div>
          
          {errorQueries && (
            <div style={{ color: '#e53e3e', padding: '15px', textAlign: 'center', background: '#fff5f5', borderRadius: '8px' }}>
              <FaExclamationTriangle style={{ marginRight: '8px' }} />
              Error: {errorQueries}
            </div>
          )}
        </div>
        
        {/* Quick Actions Panel */}
        <div className="quick-actions" style={{...panelStyle, flex: '1 1 300px'}}>
          <div className="panel-header" style={{ ...panelHeaderStyle, justifyContent: 'flex-start' }}>
            <h3 style={headingStyle}>Quick Actions</h3>
          </div>
          <div className="action-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <button
              className="action-btn"
              onClick={() => window.location.href = '/knowledge'}
              style={{
                ...actionButtonStyle,
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 7px 14px rgba(0,0,0,0.12)',
                }
              }}
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
