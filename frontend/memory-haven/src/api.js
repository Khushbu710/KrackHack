const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An error occurred. Please try again later.',
    }));
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};

// Register a user
export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// Login a user
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(response);
  if (data.token) {
    localStorage.setItem('token', data.token); // Save the token
  }
  return data;
};

// Create a time capsule
export const createTimeCapsule = async (title, message, openDate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  const response = await fetch(`${API_URL}/api/memoryhaven`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, message, openDate }),
  });
  return handleResponse(response);
};

// Fetch all time capsules
export const fetchTimeCapsules = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  const response = await fetch(`${API_URL}/api/memoryhaven`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};

// Fetch details of a specific time capsule
export const fetchCapsuleDetails = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  const response = await fetch(`${API_URL}/api/memoryhaven/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  const response = await fetch(`${API_URL}/api/user`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};

export default API_URL;