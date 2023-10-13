import React, { useState } from "react";

function ProductModal({
  setModalOpen,
  type = "edit",
  handleSubmit,
  product,
  products,
}) {
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
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const validationErrors = {};
    const productExists = products.some(
      (p) => p.title === formData.title && p.id !== formData.id
    );

    if (productExists) {
      validationErrors.title = "Title already taken.";
    }

    if (formData.title.length < 1) {
      validationErrors.title = "Title is required.";
    }

    if (formData.description.length < 1) {
      validationErrors.description = "Description is required.";
    }

    if (formData.artist.length < 1) {
      validationErrors.artist = "Artist name is required.";
    }

    if (formData.dimensions.length < 1) {
      validationErrors.dimensions = "Dimensions are required.";
    }

    if (isNaN(parseInt(formData.price))) {
      validationErrors.price = "Price must be an integer and is required.";
    }

    if (isNaN(parseInt(formData.year))) {
      validationErrors.year = "Year must be an integer and is required.";
    }

    // This method is so awesome! We can display multiple errors that way
    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, submit the form
      handleSubmit(formData);
      setModalOpen(false);
    } else {
      // If there are validation errors, set them in the state
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                {type == "edit" ? "Edit Product" : "Add Product"}
              </h3>
              <button className="btn" onClick={() => setModalOpen(false)}>
                <span className="">x</span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form action="" className="flex flex-col gap-2">
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
                <TextAreaInput
                  name="description"
                  handleChange={handleChange}
                  formData={formData}
                />
                {Object.keys(errors).map((key) => (
                  <p key={key} className="text-red-500">
                    {errors[key]}
                  </p>
                ))}
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
