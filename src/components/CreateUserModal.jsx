function CreateUserModal({ onSubmit, onClose, errors, register }) {
  return (
    <div className="modal bg-gray-500 bg-opacity-50 absolute inset-0 flex items-center justify-center">
      <div
        className="modal-content bg-white p-4 rounded-lg shadow-lg"
        style={{ minWidth: "300px", maxWidth: "600px", width: "90%" }}
      >
        <span
          className="close text-gray-700 text-lg cursor-pointer float-right"
          onClick={onClose}
        >
          &times;
        </span>
        <div className="w-full">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Create User
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">
                {errors.address.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
                  message:
                    "Password must contain at least one uppercase letter and one special character.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}

            <select
              {...register("role")}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="CLIENT">Client</option>
              <option value="ADMINISTRATOR">Administrator</option>
            </select>

            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-indigo-500"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUserModal;
