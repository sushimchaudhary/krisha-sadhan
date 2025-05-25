"use client";

import React from "react";

interface User {
  username: string;
  email: string;
  role: string;
}

export default function UserModal({
  users,
  onClose,
}: {
  users: User[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] md:w-[600px] max-h-[80%] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-red-600 font-bold text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">All Users</h2>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={index} className="border p-3 rounded shadow-sm">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
