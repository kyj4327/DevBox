import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          console.log("User Info:", userInfo);
          setUser(userInfo);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser ,loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);