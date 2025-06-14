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

// Icons (Heroicons-style SVG inline)
const IconClose = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconEdit = () => (
  <svg
    className="w-5 h-5 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 4h-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    />
  </svg>
);

const IconDelete = () => (
  <svg
    className="w-5 h-5 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7L5 7M6 7L7 19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M10 11v6M14 11v6M9 7v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"
    />
  </svg>
);

const IconCheck = () => (
  <svg
    className="w-4 h-4 inline-block mr-1 text-green-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconOffline = () => (
  <svg
    className="w-4 h-4 inline-block mr-1 text-gray-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

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
    <div
      className="
    fixed inset-0 z-[99999] flex justify-center items-start pt-24 px-4
    bg-gradient-to-tr from-indigo-900/70 via-black/60 to-gray-900/80
    backdrop-blur-sm overflow-y-auto
  "
    >
      <div
        className="
      bg-white rounded-3xl shadow-2xl 
      w-full max-w-7xl max-h-[85vh] overflow-y-auto 
      p-6 md:p-10 relative flex flex-col
    "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">

          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight items-center justify-center">
            User Management
          </h2>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-red-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-500"
          > 
            <IconClose />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border-2 border-gray-200 shadow-sm flex-grow">
          <table className="w-full table-auto border-collapse text-gray-700">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="uppercase text-sm tracking-wider text-gray-600 select-none">
                <th className="py-3 px-6 border-b border-gray-300 text-left">#</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left">Name</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left">Email</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left">Role</th>
                <th className="py-3 px-6 border-b border-gray-300 text-center">Status</th>
                <th className="py-3 px-6 border-b border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 font-medium"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.email}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                  >
                    <td className="py-4 px-6">{index + 1}</td>

                    {editUserEmail === user.email ? (
                      <>
                        <td className="py-2 px-6">
                          <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoFocus
                          />
                        </td>
                        <td className="py-3 px-6 text-gray-600 select-none">
                          {user.email}
                        </td>
                        <td className="py-2 px-6">
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-2 px-6 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-xs select-none">
                            <IconCheck />
                            Active
                          </span>
                        </td>
                        <td className="py-2 px-7 gap-4 text-center space-x-3">

                          <button
                            onClick={saveEdit}
                            className="btn btn-success"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditUserEmail(null)}
                            className="btn btn-primary"
                          >
                            Cancel
                          </button>

                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-6 font-semibold">{user.username}</td>
                        <td className="py-3 px-6 text-gray-600">{user.email}</td>
                        <td className="py-3 px-6 capitalize">{user.role}</td>
                        <td className="py-3 px-6 text-center">
                          <button
                            onClick={() =>
                              onUpdateUser({ ...user, active: !user.active })
                            }
                            className={`inline-flex items-center justify-center space-x-1 px-4 py-1 rounded-full font-semibold text-xs transition ${user.active
                              ? "bg-green-200 text-green-800 hover:bg-green-300"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            aria-label={`Set user ${user.active ? "offline" : "online"
                              }`}
                          >
                            {user.active ? <IconCheck /> : <IconOffline />}
                            <span>{user.active ? "Online" : "Offline"}</span>
                          </button>
                        </td>
                        <td className="flex  gap-3 py-4 px-6 text-center space-x-6">
                          <button
                            onClick={() => startEdit(user)}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold transition flex items-center justify-center"
                            aria-label={`Edit user ${user.username}`}
                          >
                            <IconEdit />

                          </button>
                          <button
                            onClick={() => onDeleteUser(user)}
                            className="btn-success text-red-600 hover:text-red-800 font-semibold transition flex items-center justify-center"
                            aria-label={`Delete user ${user.username}`}
                          >
                            <IconDelete />

                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}