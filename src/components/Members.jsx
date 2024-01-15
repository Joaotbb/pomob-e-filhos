import api from "../axios";
import { useEffect, useState } from "react";
import CreateButton from "../components/CreateButton";
import GenericModal from "./UserModal";
import { useUsers } from "../contexts/UserContext";
import DeleteModal from "../components/DeleteModal";

function Members() {
  const { users, setUsers, fetchUsers } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (user) => {
    console.log("Editing user:", user);
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const createUser = async (data) => {
    try {
      console.log(data, "createUser data ");
      const response = await api.post("/users", data);
      if (response.data.success) {
        console.log(response.data);
        setUsers([...users, response.data.newUser]);
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Failed to create user.");
    }
  };

  const updateUser = async (data, userId) => {
    console.log(data, "olha aqui");
    try {
      const response = await api.put(`/users/${userId}`, data);

      setUsers((prevUsers) => {
        // Encontrar o usuário que está sendo atualizado
        const userToUpdate = prevUsers.find((u) => u.id === userId);

        if (userToUpdate) {
          // Se o usuário for encontrado, atualizar apenas esse usuário na lista
          const updatedUsers = prevUsers.map((u) =>
            u.id === userToUpdate.id ? response.data.updatedUser : u
          );

          return updatedUsers;
        } else {
          console.warn("User not found in the current list.");
          return prevUsers;
        }
      });
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setShowDeleteModal(false);

      setUsers((prevUsers) => {
        // Remove the user from the list
        const updatedUsers = prevUsers.filter((user) => user.id !== userId);
        return updatedUsers;
      });
    } catch (error) {
      console.error("Error deleting user", error);
      // You can handle the error here, show a message, or perform any other actions.
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Selected user updated:", selectedUser);
  }, [selectedUser]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 mt-6">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <CreateButton onClick={() => setShowCreateModal(true)} />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.name}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-transform transform hover:scale-110"
                      >
                        Edit<span className="sr-only">, {user.name}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="ml-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="align-middle text-red-300 hover:text-red-500 hover:scale-110 transition-transform transform"
                        >
                          <path
                            fill="currentColor"
                            d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showEditModal &&
          (console.log("Opening edit modal with user:", selectedUser),
          (
            <GenericModal
              editMode={true}
              user={selectedUser}
              handleCloseModal={handleCloseModal}
              updateUser={updateUser}
            />
          ))}
        {showCreateModal && (
          <GenericModal
            editMode={false}
            handleCloseModal={handleCloseModal}
            createUser={createUser}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            closeModal={() => setShowDeleteModal(false)}
            deleteUser={deleteUser}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
}

export default Members;
