import React, { useState } from "react";

function UserModal({
  setModalOpen,
  type = "edit",
  handleSubmit,
  user,
  users,
  error,
  setError,
}) {
  const [formData, setFormData] = useState({
    userId: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    address: user?.address || "",
    password: user?.password || "",
    imgUrl: user?.imgUrl || "",
    isAdmin: user?.isAdmin || false,
    isActive: user?.isActive,
  });
  // const [error, setError] = useState("");

  const handleSave = async () => {
    const usernameExists = users.some(
      (u) => u.username === formData.username && u.id !== formData.userId
    );
    const emailExists = users.some(
      (u) => u.email === formData.email && u.id !== formData.userId
    );

    if (usernameExists) {
      setError("Username is already taken.");
      return;
    }
    if (emailExists) {
      setError("Email is already taken.");
      return;
    }
    if (formData.username.length < 6) {
      setError("Username must be at least 6 characters.");
      return;
    }
    if (formData.name.length < 1) {
      setError("Name must not be empty.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email address.");
      return;
    }
    if (type === "add" && formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setError("");
      return;
    }
    setError("");
    handleSubmit(formData);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setError("");
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-medium">
                {type == "edit" ? "Edit User" : "Add User"}
              </h3>
              <button className="btn" onClick={() => setModalOpen(false)}>
                <span className="">x</span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form action="" className="flex flex-col gap-2">
                <TextInput
                  name="name"
                  handleChange={handleChange}
                  formData={formData}
                />
                <TextInput
                  name="username"
                  handleChange={handleChange}
                  formData={formData}
                />
                <TextInput
                  name="email"
                  type="email"
                  handleChange={handleChange}
                  formData={formData}
                />
                {type === "new" && (
                  <TextInput
                    name="password"
                    type="password"
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                <TextInput
                  name="address"
                  handleChange={handleChange}
                  formData={formData}
                />
                <TextInput
                  name="imgUrl"
                  handleChange={handleChange}
                  formData={formData}
                />
                <Checkbox
                  name="isAdmin"
                  handleChange={handleChange}
                  formData={formData}
                />
                <Checkbox
                  name="isActive"
                  handleChange={handleChange}
                  formData={formData}
                  type="checkbox"
                />
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end gap-4 p-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="btn btn-error"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

function TextInput({ name, handleChange, formData, type = "text" }) {
  return (
    <div className="form-control w-96">
      <label className="label">
        <span className="label-text capitalize">{name}</span>
      </label>
      <input
        type={`${type}`}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`${name} here`}
        className="input input-bordered w-full"
      />
    </div>
  );
}

function Checkbox({ handleChange, formData, name }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">
          {name === "isAdmin" ? "Is Admin?" : "Is Active?"}
        </span>
        <select
          type="checkbox"
          name={name}
          id={name}
          onChange={handleChange}
          value={formData[name]}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
    </div>
  );
}
export default UserModal;
