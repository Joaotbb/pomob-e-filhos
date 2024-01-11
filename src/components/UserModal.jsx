import { useForm } from "react-hook-form";
import { useUsers } from "../contexts/UserContext";

function UserModal({
  editMode,
  user,
  createUser,
  updateUser,
  handleCloseModal,
}) {
  console.log("UserModal props:", { editMode, user });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { users, setUsers } = useUsers();

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    if (editMode) {
      if (user) {
        updateUser(data, user.id);
      } else {
        console.error("No user data for update");
        // Handle the error appropriately
      }
    } else {
      console.log(errors, "os meus erros");
      createUser(data);
    }
  };

  return (
    <div>
      <div className="modal bg-gray-500 bg-opacity-50 fixed inset-0 flex items-center justify-center">
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
            <h2 className="text-center text-2xl my-4 font-bold text-indigo-700 uppercase">
              {editMode ? "Edit User" : "Create User"}
            </h2>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full p-2 border ${
                    errors?.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  defaultValue={editMode ? user?.name : ""}
                  {...register("name", { required: "Name is required" })}
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm ">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={editMode ? user?.address : ""}
                  {...register("address", { required: "Address is required" })}
                />
                {errors?.address && (
                  <p className="text-red-500 text-sm ">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={editMode ? user?.email : ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm ">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder={
                    editMode
                      ? "Password (Leave blank to remain the same)"
                      : "Password"
                  }
                  className={`w-full p-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  {...register("password", {
                    // Example: Required validation when not in edit mode
                    required: !editMode && "Password is required",
                    // You can add more validation rules here if needed
                  })}
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <select
                defaultValue={editMode ? user?.role : ""}
                {...register("role")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="CLIENT">Client</option>
                <option value="ADMINISTRATOR">Administrator</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
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
