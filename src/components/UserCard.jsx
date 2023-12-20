import { useEffect, useState } from "react";
import api from "../axios";
import { format } from "date-fns";

function UserCard({ roleFilter }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        // Random images generation and filtering by role
        const usersWithImagesAndFilter = response.data
          .filter((user) => (roleFilter ? user.role === roleFilter : true))
          .map((user) => ({
            ...user,
            imageUrl: `https://randomuser.me/api/portraits/men/${
              user.id % 100
            }.jpg`,
          }));
        setUsers(usersWithImagesAndFilter);
      } catch (error) {
        console.error("Error getting users", error);
      }
    };

    fetchUsers();
  }, [roleFilter]);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center py-6 px-4 sm:px-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 space-y-4 shadow-lg rounded-lg bg-indigo-100 border border-gray-200"
          >
            <h3 className="mt-2 text-xl uppercase font-extrabold text-indigo-800 text-center">
              {user.name}
            </h3>
            <img
              src={user.imageUrl}
              alt="User"
              className="w-24 h-24 rounded-full mx-auto"
            />

            <p className="text-sm text-gray-600 text-center">
              Joined: {format(new Date(user.created_at), "PP")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
