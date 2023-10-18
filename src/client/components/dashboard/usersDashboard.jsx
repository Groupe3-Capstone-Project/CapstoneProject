import {
  createUser,
  deleteUser,
  editUser,
  fetchAllUsers,
  fetchUserByUsername,
} from "../../api/ajaxHelper";
import UserModal from "./userModal";
import DeleteModal from "./deleteModal";
import { useEffect, useState } from "react";

export default function UsersDashboard() {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleCreate = async (data) => {
    try {
      console.log("creating data?", data);
      await createUser(data);
      // console.log("user created!");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }

    setModal(false);
  };

  async function fetchUsers() {
    try {
      const response = await fetchAllUsers();
      const returnedUsers = response.reverse();
      setUsers(returnedUsers);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // console.log("Users mod:", users);
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
            users={users}
            error={error}
            setError={setError}
          />
        )}
      </div>

      <Users
        users={users}
        fetchUsers={fetchUsers}
        error={error}
        setError={setError}
      />
    </>
  );
}

function Users({ users, fetchUsers, error, setError }) {
  const handleDelete = async (id) => {
    try {
      // console.log("HandleDel user id:", id);
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (data) => {
    try {
      await editUser(data);
      fetchUsers();
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
                key={user.id}
                user={user}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                users={users}
                error={error}
                setError={setError}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

// User Component, used to map users
function User({ user, users, handleDelete, handleEdit, error, setError }) {
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
          {user.isActive
            ? user.isAdmin
              ? "Admin"
              : "Active User"
            : "Inactive User"}
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
            users={users}
            error={error}
            setError={setError}
          />
        )}
        {user.isActive &&
          !user.isAdmin && ( // Conditionally render the "Delete" button
            <button
              className="btn btn-outline btn-error"
              onClick={() => setDeleteModel(true)}
            >
              Delete
            </button>
          )}
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
