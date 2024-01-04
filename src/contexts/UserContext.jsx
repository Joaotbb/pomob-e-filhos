import { createContext, useContext, useState } from "react";
import api from "../axios";

const UserContent = createContext({});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <UserContent.Provider value={{ users, setUsers, fetchUsers }}>
      {children}
    </UserContent.Provider>
  );
};

export const useUsers = () => {
  return useContext(UserContent);
};
