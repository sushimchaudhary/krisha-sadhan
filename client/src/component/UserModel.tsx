import React, { useState } from "react";

interface User {
  username: string;
  email: string;
  role: string;
  active?: boolean;
}

interface UserModalProps {
  users: User[];
  onClose: () => void;
  onDeleteUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

export default function UserModal({
  users,
  onClose,
  onDeleteUser,
  onUpdateUser,
}: UserModalProps) {
  const [editUserEmail, setEditUserEmail] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("user");

  const startEdit = (user: User) => {
    setEditUserEmail(user.email);
    setEditUsername(user.username);
    setEditRole(user.role);
  };

  const saveEdit = () => {
    if (!editUserEmail) return;
    onUpdateUser({
      username: editUsername,
      email: editUserEmail,
      role: editRole,
    });
    setEditUserEmail(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            User Management
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Active</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.email} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>

                  {editUserEmail === user.email ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 text-gray-500">{user.email}</td>
                      <td className="py-2 px-4">
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 text-center">✔️</td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditUserEmail(null)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4">{user.username}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 capitalize">{user.role}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() =>
                            onUpdateUser({ ...user, active: !user.active })
                          }
                          className={`text-sm font-medium px-2 py-1 rounded ${
                            user.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteUser(user)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
