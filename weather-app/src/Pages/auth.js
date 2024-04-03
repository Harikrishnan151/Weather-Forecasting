// auth.js
export const isAuthenticated = () => {
    // Check if token exists in local storage
    return localStorage.getItem('token') !== null;
  };
  