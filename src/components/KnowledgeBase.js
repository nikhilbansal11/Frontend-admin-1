import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Folder, Trash2, RefreshCw } from 'lucide-react';
import './KnowledgeBasePagecss.css';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';

// Base URL for API endpoints
const baseUrl = "https://meridian-chatbot-backend-prompts.onrender.com";

const KnowledgeBasePage = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Utility function to convert bytes to MB
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 MB';
    const megabytes = (bytes / (1024 * 1024)).toFixed(2);
    return `${megabytes} MB`;
  };

  // Determine the status color based on the file status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': 
        return 'text-green-500';
      case 'Failed': 
        return 'text-red-500';
      case 'Processing': 
        return 'text-yellow-500';
      default: 
        return 'text-gray-500';
    }
  };

  // Handle single file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('domain', 'base');
      try {
        const response = await fetch(`${baseUrl}/admin/upload`, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        
        if (result.file_processed && result.file_processed.length > 0) {
          fetchFiles();
        } else {
          setError(result.message || 'File upload failed');
        }
      } catch (error) {
        console.error('File upload error:', error);
        setError('An error occurred during file upload');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Improved folder upload to handle multiple files
  const handleFolderUpload = async (event) => {
    const filesList = event.target.files;
    if (filesList && filesList.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      
      // Append all files from the folder
      for (let i = 0; i < filesList.length; i++) {
        formData.append('files', filesList[i]);
      }
      
      formData.append('domain', 'base');
      
      try {
        const response = await fetch(`${baseUrl}/admin/upload_folder`, {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.file_processed && result.file_processed.length > 0) {
          fetchFiles();
        } else {
          setError(result.message || 'Folder upload failed');
        }
      } catch (error) {
        console.error('Folder upload error:', error);
        setError('An error occurred during folder upload');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Fetch the list of files from the server
  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/admin/list-files`);
      const fileList = await response.json();
      
      // Transform the file list with proper size formatting
      const transformedFiles = fileList.map((file, index) => ({
        id: `file_${index}`,
        name: file.name,
        type: file.name.split('.').pop().toUpperCase(),
        size: formatFileSize(file.size),
        status: file.status || 'Active'
      }));
      
      setFiles(transformedFiles);
      setError(null);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Corrected extractDocId function
  const extractDocId = (fileName) => {
    // This regex removes the "uploaded-files/" prefix
    return fileName.replace("uploaded-files/", "");
  };

  // Handle file deletion by document ID
  const handleDeleteFile = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(`${baseUrl}/admin/delete-by-doc-id`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doc_id: docId })
      });
  
      if (response.ok) {
        fetchFiles();
      } else {
        try {
          const errorResult = await response.json();
          setError(errorResult.detail || 'File deletion failed');
        } catch {
          const errorText = await response.text();
          setError(errorText || 'File deletion failed');
        }
      }
    } catch (error) {
      console.error('File deletion error:', error);
      setError('An error occurred during file deletion');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="knowledge-base-container">
      <div className="knowledge-base-card">
        <div className="knowledge-base-header">
          <h2 className="knowledge-base-title" id='upload-btn'>Knowledge Base</h2>
          <div className="button-group">
            <input 
              type="file" 
              id="fileUpload" 
              className="hidden" 
              onChange={handleFileUpload}
            />
            <label 
              htmlFor="fileUpload" 
              className="button upload-file"
            >
              {isUploading ? <ClipLoader size={20} color="#fff" /> : <Upload className="icon" />}
              Upload File
            </label>
            <input 
              type="file" 
              id="folderUpload" 
              className="hidden" 
              multiple
              webkitdirectory="true" 
              directory="true" 
              onChange={handleFolderUpload}
            />
            <label 
              htmlFor="folderUpload" 
              className="button upload-folder"
            >
              {isUploading ? <ClipLoader size={20} color="#fff" /> : <Folder className="icon" />}
              Upload Folder
            </label>
          </div>
        </div>
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
        <table className="knowledge-base-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">#</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Type</th>
              <th className="table-cell">Size</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="table-cell text-center">Loading files...</td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-cell text-center">No files found</td>
              </tr>
            ) : (
              files.map((file, index) => (
                <tr key={file.id} className="table-row">
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{file.name.split('/').pop()}</td>
                  <td className="table-cell">{file.type}</td>
                  <td className="table-cell">{file.size}</td>
                  <td className="table-cell">
                    <span className={`status ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="actions">
                      <Tooltip content="Delete">
                        <button 
                          onClick={() => {
                            const docId = extractDocId(file.name);
                            if (docId) {
                              handleDeleteFile(docId);
                            } else {
                              setError('Invalid file format');
                            }
                          }}
                          className="action-button delete"
                          title="Delete"
                          disabled={isDeleting}
                        >
                          {isDeleting ? <ClipLoader size={20} color="#f00" /> : <Trash2 className="icon" />}
                        </button>
                      </Tooltip>
                      <Tooltip content="Refresh">
                        <button 
                          className="action-button refresh"
                          title="Refresh"
                          onClick={fetchFiles}
                        >
                          <RefreshCw className="icon" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;