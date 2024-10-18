// For regular user authentication
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;  // Returns true if token exists, false otherwise
};

// For manager authentication
export const isManagerAuthenticated = () => {
    const managerToken = localStorage.getItem('managerToken');
    return !!managerToken;  // Returns true if managerToken exists, false otherwise
};
