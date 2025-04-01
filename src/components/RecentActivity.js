import React, { useEffect, useState } from 'react';

const url = "https://meridian-backend-postdeployment-testing.onrender.com";

const RecentActivity = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${url}/get_queries`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => (b.id || 0) - (a.id || 0));
        setQueries(sortedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left'
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>Recent Activity - All Queries</div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : queries.length === 0 ? (
          <p>No queries found</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Query Text</th>
                <th style={thStyle}>Response</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{query.id || index}</td>
                  <td style={tdStyle}>{query.query || 'N/A'}</td>
                  <td style={tdStyle}>{query.response || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
