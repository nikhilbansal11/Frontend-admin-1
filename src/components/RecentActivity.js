import React, { useEffect, useState } from 'react';

// const url = "https://meridian-backend-postdeployment-testing.onrender.com";
const url = "https://adminguidedchatbot22-a7bdayd7a8bkcpca.eastus2-01.azurewebsites.net";

const RecentActivity = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDomain, setSearchDomain] = useState("");

  useEffect(() => {
    fetch(`${url}/get_queries`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch queries");
        return response.json();
      })
      .then(data => {
        const enrichedData = data.map((item, index) => ({
          id: item.id || index,
          query: item.query || 'N/A',
          response: item.response || 'N/A',
          domain: item.domain || 'BasePrompt'
        }));
        const sortedData = enrichedData.sort((a, b) => b.id - a.id);
        setQueries(sortedData);
        setFilteredQueries(sortedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchDomain(value);
    const filtered = queries.filter(q => q.domain.toLowerCase().includes(value));
    setFilteredQueries(filtered);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px'
    },
    input: {
      padding: '10px 15px',
      marginRight: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '280px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    searchButton: {
      padding: '10px 18px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f2f2f2',
      textAlign: 'left'
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px'
    },
    summary: {
      marginBottom: '10px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Recent Activity - All Queries</div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by domain..."
            value={searchDomain}
            onChange={handleSearchChange}
            style={styles.input}
          />
          <button style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.summary}>
          Showing {filteredQueries.length} of {queries.length} total queries
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : filteredQueries.length === 0 ? (
          <p>No queries found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Query Text</th>
                <th style={styles.th}>Response</th>
                <th style={styles.th}>Domain</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map((query, index) => (
                <tr key={index}>
                  <td style={styles.td}>{query.id}</td>
                  <td style={styles.td}>{query.query}</td>
                  <td style={styles.td}>{query.response}</td>
                  <td style={styles.td}>{query.domain}</td>
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
