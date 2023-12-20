function CreateUserButton({ onClick }) {
  return (
    <button
      className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-green-500"
      onClick={onClick}
    >
      Create User
    </button>
  );
}

export default CreateUserButton;
