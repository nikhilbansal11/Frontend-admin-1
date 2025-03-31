// import axios from 'axios';

// // Make sure this URL matches your FastAPI server
// const API_URL = 'https://advanced-chatbot-zrj3.onrender.com'; // Adjust this to match your backend URL

// console.log('API URL:', API_URL); // Add this for debugging

// // Create axios instance with base config
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor for debugging
// apiClient.interceptors.request.use(
//   config => {
//     console.log('API Request:', config.method.toUpperCase(), config.url);
//     return config;
//   },
//   error => {
//     console.error('API Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for debugging
// apiClient.interceptors.response.use(
//   response => {
//     console.log('API Response Status:', response.status);
//     return response;
//   },
//   error => {
//     console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// // Document management APIs
// export const documentApi = {
//   // Get all documents
//   getDocuments: async (domain = null) => {
//     try {
//       const params = domain ? { domain } : {};
//       const response = await apiClient.get('/admin/documents', { params });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       throw error;
//     }
//   },

//   // ... rest of the code remains the same


//   // Get a single document by ID
//   getDocument: async (docId) => {
//     try {
//       const response = await apiClient.get(`/admin/documents/${docId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching document ${docId}:`, error);
//       throw error;
//     }
//   },

//   // Upload a new document
//   uploadDocument: async (file, docName, domain = 'base') => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('doc_name', docName);
//       formData.append('domain', domain);

//       const response = await axios.post(`${API_URL}/admin/documents`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error uploading document:', error);
//       throw error;
//     }
//   },

//   // Update document metadata
//   updateDocument: async (docId, docName, domain) => {
//     try {
//       const formData = new FormData();
//       if (docName) formData.append('doc_name', docName);
//       if (domain) formData.append('domain', domain);

//       const response = await axios.put(`${API_URL}/admin/documents/${docId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating document ${docId}:`, error);
//       throw error;
//     }
//   },

//   // Delete a document
//   deleteDocument: async (docId) => {
//     try {
//       const response = await apiClient.delete(`/admin/documents/${docId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting document ${docId}:`, error);
//       throw error;
//     }
//   },
// };

// // Dashboard APIs
// export const dashboardApi = {
//   // Get dashboard data
//   getDashboardData: async () => {
//     try {
//       const response = await apiClient.get('/admin/dashboard');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       throw error;
//     }
//   },
// };

// // Prompt management APIs
// export const promptApi = {
//   // Get all prompts
//   getPrompts: async () => {
//     try {
//       const response = await apiClient.get('/admin/prompts');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching prompts:', error);
//       throw error;
//     }
//   },

//   // Get a single prompt
//   getPrompt: async (domain) => {
//     try {
//       const response = await apiClient.get(`/admin/prompts/${domain}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching prompt ${domain}:`, error);
//       throw error;
//     }
//   },

//   // Create a new prompt
//   createPrompt: async (domain, promptText) => {
//     try {
//       const formData = new FormData();
//       formData.append('domain', domain);
//       formData.append('prompt_text', promptText);

//       const response = await axios.post(`${API_URL}/admin/prompts`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating prompt:', error);
//       throw error;
//     }
//   },

//   // Update a prompt
//   updatePrompt: async (domain, promptText) => {
//     try {
//       const formData = new FormData();
//       formData.append('prompt_text', promptText);

//       const response = await axios.put(`${API_URL}/admin/prompts/${domain}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating prompt ${domain}:`, error);
//       throw error;
//     }
//   },

//   // Delete a prompt
//   deletePrompt: async (domain) => {
//     try {
//       const response = await apiClient.delete(`/admin/prompts/${domain}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting prompt ${domain}:`, error);
//       throw error;
//     }
//   },
// };

// export default {
//   documentApi,
//   dashboardApi,
//   promptApi,
// };