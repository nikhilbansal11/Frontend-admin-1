import axios from 'axios';

// Base URL for the API
const API_URL = 'https://advanced-chatbot-zrj3.onrender.com';

// Add comprehensive debugging
console.log('Backend API URL:', API_URL);

// Document API service
const documentService = {
  // Get all documents
  getAllDocuments: async () => {
    console.log('Fetching all documents...');
    try {
      // Make a direct fetch call for better debugging
      const response = await fetch(`${API_URL}/documents`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Documents data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },

  // Upload a document
  uploadDocument: async (file, docName) => {
    console.log('Uploading document:', file.name, 'with name:', docName);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('doc_name', docName);
      formData.append('domain', 'base'); // Default domain

      for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} = ${value}`);
      }

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        // Do not set Content-Type header, browser will set it with boundary
      });

      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Upload response data:', data);
      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  // Delete a document
  deleteDocument: async (docId) => {
    console.log('Deleting document with ID:', docId);
    try {
      const response = await fetch(`${API_URL}/documents/${docId}`, {
        method: 'DELETE',
      });
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Delete response data:', data);
      return data;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
};

export default documentService;