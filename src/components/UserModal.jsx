import api from "../axios";
import { useUsers } from "../contexts/UserContext";

function UserModal({ editMode, user, handleCloseModal, formMethods }) {
  const { register, handleSubmit, errors, reset } = formMethods;
  const { users, setUsers } = useUsers();

  const createUser = async (data) => {
    try {
      console.log(data, "createUser data ");
      const response = await api.post("/users", data);
      if (response.data.success) {
        console.log(response.data);
        setUsers([...users, response.data.newUser]);

        reset();
        setTimeout(() => {}, 2000);
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Failed to create user.");
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await api.put(`/users/${user.id}`, data);

      setUsers((prevUsers) => {
        // Encontrar o usuário que está sendo atualizado
        const userToUpdate = prevUsers.find((u) => u.id === user.id);

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

  return (
    <div>
      {editMode ? <p>edit mode</p> : <p>Create mode</p>}

      <div className="modal bg-gray-500 bg-opacity-50 absolute inset-0 flex items-center justify-center">
        <div
          className="modal-content bg-white p-4 rounded-lg shadow-lg"
          style={{ minWidth: "300px", maxWidth: "600px", width: "90%" }}
        >
          <span
            className="close text-gray-700 text-lg cursor-pointer float-right"
            onClick={handleCloseModal}
          >
            &times;
          </span>
          <div className="w-full">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              {editMode ? "Edit User" : "Create User"}
            </h2>
            {/* {showSuccessMessage && <div>Usuário atualizado com sucesso!</div>} */}
            <form
              onSubmit={handleSubmit(editMode ? updateUser : createUser)}
              className="space-y-6"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={editMode && user ? user.name : ""}
                {...register("name")}
              />

              <input
                type="text"
                placeholder="Adress"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={editMode && user ? user.address : ""}
                {...register("address", { required: "Address is required" })}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={editMode && user ? user.email : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />

              <input
                type="password"
                placeholder="Password (leave blank to keep current)"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("password")}
              />

              <select
                defaultValue={editMode && user ? user.role : ""}
                {...register("role")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="CLIENT">Client</option>
                <option value="ADMINISTRATOR">Administrator</option>
                <option value="EMPLOYEE">Employee</option>
              </select>

              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-indigo-500"
              >
                {editMode ? <p>Update User</p> : <p>Create User</p>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
