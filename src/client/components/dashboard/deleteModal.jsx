function DeleteModal({ setModalOpen, handleSubmit, type, title, id }) {
  const handleDelete = () => {
    handleSubmit(id);
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
              <h3 className="text-2xl font-medium capitalize">
                {`Delete ${type}`}
              </h3>
              <button className="btn" onClick={() => setModalOpen(false)}>
                <span className="">x</span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">{`Are you sure you want to delete ${type} ${title}?`}</div>
            {/*footer*/}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="btn btn-error"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                type="button"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
export default DeleteModal;
