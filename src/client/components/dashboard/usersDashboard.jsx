import { registerUser } from "../../api/ajaxHelper";
import UserModal from "./userModal";
import { useState } from "react";

export default function UsersDashboard() {
  const [modal, setModal] = useState(false);

  const handleCreate = async ({ username, name, email, address, password }) => {
    try {
      const rv = await registerUser(name, email, address, username, password);
      console.log(rv);
    } catch (err) {
      console.error(err);
    }

    setModal(false);
  };

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

      <Users />
    </>
  );
}

function Users() {
  // const [users, setUsers] = useState();

  const users = [
    {
      name: "Naoko Kitamura",
      username: "morinosei",
      email: "naoko@example.com",
      isAdmin: true,
      address: "13 broad ave, chicago",
    },
    {
      name: "Naoko Kitamura",
      username: "morinosei",
      email: "naoko@example.com",
      isAdmin: false,
      address: "13 broad ave, chicago",
    },
  ];

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
          <User user={users[0]} />
          <User user={users[0]} />
          <User user={users[1]} />
          <User user={users[0]} />
          <User user={users[0]} />
          <User user={users[1]} />
        </tbody>
      </table>
    </div>
  );
}

function User({ user }) {
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

      <th className="font-normal">
        <button className="btn" onClick={() => setModal(true)}>
          Edit
        </button>
        {modal && <UserModal user={user} setModalOpen={setModal} />}
      </th>
    </tr>
  );
}
