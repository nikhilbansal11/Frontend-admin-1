import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './settings.css'

const url = "https://meridian-chatbot-backend-prompts.onrender.com";

const Settings = () => {
  // State management
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [currentPrompt, setCurrentPrompt] = useState({
    id: 0,
    domain_name: '',
    system_prompt: '',
    format_template: '',
    temperature: 0.7,
    max_tokens: 1000
  });

  // Fetch all prompts on component mount
  useEffect(() => {
    fetchPrompts();
  }, []);

  // Extract unique domains for filtering
  useEffect(() => {
    if (prompts.length > 0) {
      const uniqueDomains = [...new Set(prompts.map(prompt => prompt.domain_name))];
      setDomains(uniqueDomains);
    }
  }, [prompts]);

  // Filter prompts when domain selection changes
  useEffect(() => {
    if (selectedDomain === '') {
      setFilteredPrompts(prompts);
    } else {
      setFilteredPrompts(prompts.filter(prompt => prompt.domain_name === selectedDomain));
    }
  }, [selectedDomain, prompts]);

  // API calls
  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/admin/prompts`);
      setPrompts(response.data);
      setFilteredPrompts(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch prompts. Please try again.');
      setIsLoading(false);
      console.error('Error fetching prompts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isCreating) {
        // Changed endpoint from "createprompts" to "prompts" for consistency
        await axios.post(`${url}/admin/createprompts`, currentPrompt);
      } else if (isEditing) {
        // Changed from POST to PUT and updated endpoint
        await axios.put(`${url}/admin/prompts`, currentPrompt);
      }
      // Reset states and refresh prompts
      setIsEditing(false);
      setIsCreating(false);
      setCurrentPrompt({
        id: 0,
        domain_name: '',
        system_prompt: '',
        format_template: '',
        temperature: 0.7,
        max_tokens: 1000
      });
      fetchPrompts();
    } catch (err) {
      setError('Failed to save prompt. Please try again.');
      console.error('Error saving prompt:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prompt?')) return;
    
    try {
      await axios.delete(`${url}/admin/prompts/${id}`);
      
      // Update local state without fetching from server
      const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
      setPrompts(updatedPrompts);
      
      // No need to call fetchPrompts() which reloads everything
    } catch (err) {
      setError('Failed to delete prompt. Please try again.');
      console.error('Error deleting prompt:', err);
    }
  };

  const handleEdit = (prompt) => {
    setCurrentPrompt(prompt);
    setIsEditing(true);
    setIsCreating(false);
    window.scrollTo(0, 0);
  };

  const handleCreate = () => {
    let len = prompts.length;
    setCurrentPrompt({
      id: len + 1,
      domain_name: '',
      system_prompt: '',
      format_template: '',
      temperature: 0.7,
      max_tokens: 1000
    });
    setIsCreating(true);
    setIsEditing(false);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setCurrentPrompt({
      id: 0,
      domain_name: '',
      system_prompt: '',
      format_template: '',
      temperature: 0.7,
      max_tokens: 1000
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'temperature' || name === 'max_tokens') {
      setCurrentPrompt({
        ...currentPrompt,
        [name]: parseFloat(value)
      });
    } else {
      setCurrentPrompt({
        ...currentPrompt,
        [name]: value
      });
    }
  };

  // Render form component
  const renderForm = () => (
    <div className="card card-mb">
      <h2 className="section-title">
        {isCreating ? 'Create New Prompt' : 'Edit Prompt'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {isEditing && (
          <div className="form-group">
            <label className="form-label">ID</label>
            <input 
              type="number" 
              name="id" 
              value={currentPrompt.id} 
              className="form-input form-input-disabled" 
              disabled 
            />
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Domain Name *</label>
          <input 
            type="text" 
            name="domain_name" 
            value={currentPrompt.domain_name} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">System Prompt *</label>
          <textarea 
            name="system_prompt" 
            value={currentPrompt.system_prompt} 
            onChange={handleChange} 
            className="form-textarea" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Format Template</label>
          <textarea 
            name="format_template" 
            value={currentPrompt.format_template} 
            onChange={handleChange} 
            className="form-textarea" 
          />
        </div>
        
        <div className="form-grid">
          <div>
            <label className="form-label">Temperature *</label>
            <input 
              type="number" 
              name="temperature" 
              value={currentPrompt.temperature} 
              onChange={handleChange} 
              className="form-input" 
              step="0.1" 
              min="0" 
              max="1" 
              required 
            />
            <small className="form-help-text">Value between 0 and 1</small>
          </div>
          
          <div>
            <label className="form-label">Max Tokens *</label>
            <input 
              type="number" 
              name="max_tokens" 
              value={currentPrompt.max_tokens} 
              onChange={handleChange} 
              className="form-input" 
              min="1" 
              required 
            />
          </div>
        </div>
        
        <div className="btn-container">
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            {isCreating ? 'Create' : 'Save Changes'}
          </button>
          
          <button 
            type="button" 
            onClick={handleCancel} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  // Render prompt list
  const renderPromptList = () => (
    <div className="card">
      <div className="header-container">
        <h2 className="section-title header-title">Prompts</h2>
        
        <div className="filter-container">
          <div>
            <label className="filter-label">Filter by Domain:</label>
            <select 
              value={selectedDomain} 
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="filter-select"
            >
              <option value="">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleCreate}
            className="btn btn-success"
          >
            + New Prompt
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-message">
          <p>Loading prompts...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={fetchPrompts}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <div className="empty-message">
          <p>No prompts found. Create a new prompt to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="table-cell">ID</th>
                <th className="table-cell">Domain</th>
                <th className="table-cell">System Prompt</th>
                <th className="table-cell">Temperature</th>
                <th className="table-cell">Max Tokens</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrompts.map(prompt => (
                <tr key={prompt.id} className="table-row">
                  <td className="table-cell">{prompt.id}</td>
                  <td className="table-cell">{prompt.domain_name}</td>
                  <td className="table-cell">
                    <div className="table-cell-truncate">
                      {prompt.system_prompt.substring(0, 100)}
                      {prompt.system_prompt.length > 100 ? '...' : ''}
                    </div>
                  </td>
                  <td className="table-cell">{prompt.temperature}</td>
                  <td className="table-cell">{prompt.max_tokens}</td>
                  <td className="table-cell">
                    <div className="btn-container">
                      <button 
                        onClick={() => handleEdit(prompt)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(prompt.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
      <h1 className="page-title">Prompt Management Settings</h1>
      
      {(isEditing || isCreating) && renderForm()}
      
      {renderPromptList()}
    </div>
  );
};

export default Settings;