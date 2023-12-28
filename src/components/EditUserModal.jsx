import api from "../axios";

function EditUserModal({ user, onClose, formMethods }) {
  const { register, handleSubmit, errors } = formMethods;

  // Função para lidar com a submissão do formulário
  const onSubmit = async (formData) => {
    try {
      // Aqui você deve adicionar a lógica para enviar os dados para o seu backend
      // Por exemplo: uma requisição PUT para atualizar o usuário
      const response = await api.put(`/users/${user.id}`, formData);

      if (response.data.success) {
        // Lógica após a atualização bem-sucedida do usuário
        // Por exemplo: fechar a modal e atualizar a lista de usuários
        onClose();
        // Você pode querer chamar uma função para recarregar os usuários aqui
      } else {
        // Lidar com a resposta de falha
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Failed to update user.");
    }
  };

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
            Edit User
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user.name}
              {...register("name")}
            />
            {/* Errors and other fields here*/}

            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user.address}
              {...register("address")}
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user.email}
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
              defaultValue={user.role}
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
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
