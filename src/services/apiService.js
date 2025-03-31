// apiService.js
const API_URL = "http://127.0.0.1:8000";
// Uncomment alternative if needed:
// const API_URL = "http://127.0.0.1:2048";
console.log("Backend API URL:", API_URL);

// Logging functions
function logRequest(method, url) {
  console.log("API Request:", method.toUpperCase(), url);
}
function logResponse(status, url) {
  console.log("API Response:", status, url);
}
function logError(message) {
  console.error("API Error:", message);
}

// Helper function for API calls
async function apiCall(method, endpoint, data = null, isFormData = false) {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method: method,
    headers: {}
  };

  if (data) {
    if (isFormData) {
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  logRequest(method, url);

  try {
    const response = await fetch(url, options);
    logResponse(response.status, url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    logError(error.message);
    throw error;
  }
}


// Prompt management APIs
const promptApi = {
  getPrompts: async () => {
    try {
      return await apiCall("GET", "/admin/prompts");
    } catch (error) {
      console.error("Error fetching prompts:", error);
      throw error;
    }
  },
  getPrompt: async (domain) => {
    try {
      return await apiCall("GET", `/admin/prompts/${domain}`);
    } catch (error) {
      console.error(`Error fetching prompt ${domain}:`, error);
      throw error;
    }
  },
  createPrompt: async (domain, promptText) => {
    try {
      const formData = new FormData();
      formData.append("domain", domain);
      formData.append("prompt_text", promptText);
      return await apiCall("POST", "/admin/prompts", formData, true);
    } catch (error) {
      console.error("Error creating prompt:", error);
      throw error;
    }
  },
  updatePrompt: async (domain, promptText) => {
    try {
      const formData = new FormData();
      formData.append("prompt_text", promptText);
      return await apiCall("PUT", `/admin/prompts/${domain}`, formData, true);
    } catch (error) {
      console.error(`Error updating prompt ${domain}:`, error);
      throw error;
    }
  },
  deletePrompt: async (domain) => {
    try {
      return await apiCall("DELETE", `/admin/prompts/${domain}`);
    } catch (error) {
      console.error(`Error deleting prompt ${domain}:`, error);
      throw error;
    }
  }
};

// Test connection function using fetch directly.
const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, { method: "GET" });
    if (response.ok) {
      return { success: true, status: response.status };
    } else {
      return { success: false, status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error("Connection test failed:", error);
    return {
      success: false,
      status: 500,
      statusText: "",
      error: error.message
    };
  }
};

const dashboardApi = {
  getDashboardData: async () => {
    return "all good"
  },
};

// Expose the API modules
// const apiService = {
//   // documentApi,
//   promptApi,
//   testConnection, 
//   dashboardApi
// };

// window.apiService = apiService;
// window.promptApi = promptApi;
// Optionally expose documentApi if needed:
// window.documentApi = documentApi;

export { promptApi, testConnection, dashboardApi };
// export default { promptApi };