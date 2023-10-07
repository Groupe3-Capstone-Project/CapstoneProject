import { createUser, deleteUser, fetchAllUsers } from "../../api/ajaxHelper";
import UserModal from "./userModal";
import DeleteModal from "./deleteModal";
import { useEffect, useState } from "react";

export default function UsersDashboard() {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleCreate = async (data) => {
    try {
      await createUser(data);
      console.log("user created!");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }

    setModal(false);
  };

  async function fetchUsers() {
    try {
      const returnedUsers = await fetchAllUsers();
      setUsers(returnedUsers);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl mb-4">All Users</h1>
      <div className="flex justify-end">
        <button className="btn" onClick={() => setModal(true)}>
          Add User
        </button>
        {modal && (
          <UserModal
            type="new"
            setModalOpen={setModal}
            handleSubmit={handleCreate}
          />
        )}
      </div>

      <Users users={users} fetchUsers={fetchUsers} />
    </>
  );
}

function Users({ users, fetchUsers }) {
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (data) => {
    try {
      // await editUser(data);
      // fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <User
                user={user}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function User({ user, handleDelete, handleEdit }) {
  const [deleteModal, setDeleteModel] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"
                alt="Profile avatar"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">{user.username}</div>
          </div>
        </div>
      </td>
      <td>
        {user.email}
        <br />
        <span className="badge badge-ghost badge-sm">
          {user.isAdmin ? "Admin" : "Regular User"}
        </span>
      </td>
      <td>{user.address}</td>

      <th className="font-normal flex gap-4">
        <button className="btn" onClick={() => setModal(true)}>
          Edit
        </button>
        {modal && (
          <UserModal
            user={user}
            setModalOpen={setModal}
            handleSubmit={handleEdit}
          />
        )}
        <button
          className="btn btn-outline btn-error"
          onClick={() => setDeleteModel(true)}
        >
          Delete
        </button>
        {deleteModal && (
          <DeleteModal
            type="user"
            handleSubmit={handleDelete}
            title={user.name}
            id={user.id}
            setModalOpen={setDeleteModel}
          />
        )}
      </th>
    </tr>
  );
}
