import React, { useState } from "react";

function ProductModal({ setModalOpen, type = "edit", handleSubmit, product }) {
  const [formData, setFormData] = useState({
    postId: product?.id || "",
    title: product?.title || "",
    artist: product?.artist || "",
    price: product?.price || "",
    description: product?.description || "",
    imgUrl: product?.imgUrl || "",
    year: product?.year || "",
    period: product?.period || "",
    medium: product?.medium || "",
    dimensions: product?.dimensions || "",
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
    setModalOpen(false);
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
                {type == "edit" ? "Edit Product" : "Add Product"}
              </h3>
              <button className="btn" onClick={() => setModalOpen(false)}>
                <span className="">x</span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form action="" className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <TextInput
                    name="title"
                    handleChange={handleChange}
                    formData={formData}
                  />
                  <TextInput
                    name="artist"
                    handleChange={handleChange}
                    formData={formData}
                  />
                </div>
                <TextInput
                  name="price"
                  handleChange={handleChange}
                  formData={formData}
                />
                <TextInput
                  name="imgUrl"
                  handleChange={handleChange}
                  formData={formData}
                />
                {type == "new" ? (
                  <>
                    <div className="flex gap-4">
                      <TextInput
                        name="year"
                        handleChange={handleChange}
                        formData={formData}
                      />
                      <TextInput
                        name="period"
                        handleChange={handleChange}
                        formData={formData}
                      />
                    </div>
                    <div className="flex gap-4">
                      <TextInput
                        name="dimensions"
                        handleChange={handleChange}
                        formData={formData}
                      />
                      <TextInput
                        name="medium"
                        handleChange={handleChange}
                        formData={formData}
                      />
                    </div>
                  </>
                ) : null}
                <TextAreaInput
                  name="description"
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

function TextInput({ name, handleChange, formData }) {
  return (
    <div className="form-control w-96">
      <label className="label">
        <span className="label-text capitalize">{name}</span>
      </label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`${name} here`}
        className="input input-bordered w-full"
      />
    </div>
  );
}

function TextAreaInput({ name, handleChange, formData }) {
  return (
    <div className="form-control w-96">
      <label className="label">
        <span className="label-text capitalize">{name}</span>
      </label>
      <textarea
        rows={5}
        value={formData[name]}
        onChange={handleChange}
        name={name}
        placeholder={`${name} here`}
        className="input input-bordered w-full h-24"
      />
    </div>
  );
}
export default ProductModal;
