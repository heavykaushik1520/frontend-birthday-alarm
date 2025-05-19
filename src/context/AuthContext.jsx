// /* eslint-disable no-unused-vars */
// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const tokenValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
//   const inactivityTimeout = 4 * 60 * 1000; // 4 minutes in milliseconds
//   const [lastActive, setLastActive] = useState(Date.now());

//   const updateAuthToken = (token) => {
//     setAuthToken(token);
//     localStorage.setItem("authToken", token);
//   };

//   const logout = useCallback(async () => {
//     const currentToken = localStorage.getItem("authToken");
//     setAuthToken(null);
//     setUser(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("refreshToken"); // If you are using refreshToken on the frontend

//     try {
//       const response = await fetch("http://localhost:3000/api/admin/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${currentToken}`, // Send the current token for backend processing
//         },
//       });
//       if (response.ok) {
//         // console.log('Logged out successfully from server.');
//       } else {
//         console.error("Error logging out from server:", response.status);
//         // Optionally handle server-side logout failure
//       }
//     } catch (error) {
//       console.error("Error communicating with server for logout:", error);
//     } finally {
//       navigate("/");
//     }
//   }, [navigate]);

//   const checkTokenExpiry = async () => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);

//         const currentTime = Date.now();
//         const expiryTime = decodedToken.exp * 1000;
//         const issueTime = decodedToken.iat * 1000;

//         // If token is expired — logout
//         if (expiryTime < currentTime) {
//           console.log("Token expired");
//           logout();
//           return;
//         }

//         // If token is near expiry (e.g., will expire in the next 1 minute), refresh it
//         if (expiryTime - currentTime <= 60 * 1000) {
//           // console.log('Refreshing token...');

//           try {
//             const response = await fetch(
//               "http://localhost:3000/api/admin/refresh-token",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             if (response.ok) {
//               const data = await response.json();
//               updateAuthToken(data.token);
//               // console.log('Token refreshed');
//             } else {
//               console.log("Failed to refresh token");
//               logout();
//             }
//           } catch (refreshError) {
//             console.error("Error refreshing token:", refreshError);
//             logout();
//           }
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         logout();
//       }
//     }
//   };

//   const resetInactivityTimer = useCallback(() => {
//     setLastActive(Date.now());
//   }, []);

//   useEffect(() => {
//     checkTokenExpiry();
//     const expiryInterval = setInterval(checkTokenExpiry, 15 * 1000); // Check every 15 seconds

//     const handleUserActivity = () => {
//       resetInactivityTimer();
//     };

//     window.addEventListener("mousemove", handleUserActivity);
//     window.addEventListener("keydown", handleUserActivity);

//     const checkInactivity = () => {
//       if (Date.now() - lastActive > inactivityTimeout) {
//         console.log("User inactive - logging out");
//         logout();
//       }
//     };

//     const inactivityInterval = setInterval(checkInactivity, 30 * 1000); // Check every 30 seconds

//     return () => {
//       clearInterval(expiryInterval);
//       clearInterval(inactivityInterval);
//       window.removeEventListener("mousemove", handleUserActivity);
//       window.removeEventListener("keydown", handleUserActivity);
//     };
//   }, [
//     navigate,
//     lastActive,
//     logout,
//     resetInactivityTimer,
//     tokenValidityDuration,
//   ]);

//   return (
//     <AuthContext.Provider
//       value={{ authToken, updateAuthToken, logout, user, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [lastActive, setLastActive] = useState(Date.now());
  const navigate = useNavigate();

  const inactivityTimeout = 4 * 60 * 1000; // 4 minutes

  const updateAuthToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const logout = useCallback(async () => {
    const currentToken = localStorage.getItem('authToken');
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    try {
      const response = await fetch('http://localhost:3000/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        console.error('Error logging out from server:', response.status);
      }
    } catch (error) {
      console.error('Error communicating with server for logout:', error);
    } finally {
      navigate('/');
    }
  }, [navigate]);

  const checkTokenExpiry = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now();
      const expiryTime = decodedToken.exp * 1000;

      if (expiryTime < currentTime) {
        console.log('Token expired');
        logout();
        return;
      }

      if (expiryTime - currentTime <= 60 * 1000) {
        try {
          const response = await fetch('http://localhost:3000/api/admin/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            updateAuthToken(data.token);
          } else {
            console.log('Failed to refresh token');
            logout();
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          logout();
        }
      }

    } catch (error) {
      console.error('Invalid token:', error);
      logout();
    }
  };

  const resetInactivityTimer = useCallback(() => {
    setLastActive(Date.now());
  }, []);

  useEffect(() => {
    checkTokenExpiry();

    const expiryInterval = setInterval(checkTokenExpiry, 15 * 1000);

    const handleUserActivity = () => resetInactivityTimer();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    const checkInactivity = () => {
      if (Date.now() - lastActive > inactivityTimeout) {
        // console.log('User inactive - logging out');
        logout();
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 30 * 1000);

    return () => {
      clearInterval(expiryInterval);
      clearInterval(inactivityInterval);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [lastActive, logout, resetInactivityTimer]);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
