import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../axios";
import CreateUserButton from "../components/CreateUserButton";
import CreateUserModal from "../components/CreateUserModal";
import UserList from "../components/UserList";

function Users() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/users", data);
      if (response.data.success) {
        setShowSuccessMessage(true);
        reset();
        setTimeout(() => {
          setShowSuccessMessage(false);
          setShowModal(false);
        }, 2000); // Wait 2 seconds before closing the modal
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center my-6">
        <CreateUserButton onClick={() => setShowModal(true)} />
      </div>

      <UserList />

      {showModal && (
        <CreateUserModal
          onSubmit={handleSubmit(onSubmit)}
          onClose={() => setShowModal(false)}
          errors={errors}
          register={register}
          showSuccessMessage={showSuccessMessage}
        />
      )}
    </div>
  );
}

export default Users;
