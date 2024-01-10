import api from "../axios";
import { useForm } from "react-hook-form";
import { useUsers } from "../contexts/UserContext";

function UserModal({
  editMode,
  user,
  createUser,
  updateUser,
  handleCloseModal,
}) {
  const formMethods = useForm();
  const { register, handleSubmit, errors, reset } = formMethods;
  const { users, setUsers } = useUsers();

  const onSubmit = (data) => {
    // Se editMode for verdadeiro, pass userId para a função updateUser
    if (editMode) {
      updateUser(data, user.id);
    } else {
      // Se editMode for falso, chame a função createUser
      createUser(data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
