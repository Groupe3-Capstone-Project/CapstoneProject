import React, { useState } from "react";

function UserModal({ setModalOpen, type = "edit", handleSubmit, user }) {
  const [formData, setFormData] = useState({
    userId: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    address: user?.address || "",
    password: user?.password || "",
    imgUrl: user?.imgUrl || "",
    isAdmin: user?.isAdmin || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    handleSubmit(formData);
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-medium">
                {type == "edit" ? "Edit User" : "Add User"}
              </h3>
              <button className="btn" onClick={() => setModalOpen(false)}>
                <span className="">x</span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form action="" className="flex flex-col gap-4">
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
                <TextInput
                  name="password"
                  type="password"
                  handleChange={handleChange}
                  formData={formData}
                />
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
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-solid border-blueGray-200 rounded-b">
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
        <span className="label-text">Is Admin?</span>
        <select
          name={name}
          id={name}
          onChange={handleChange}
          value={formData.isAdmin}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
    </div>
  );
}
export default UserModal;
