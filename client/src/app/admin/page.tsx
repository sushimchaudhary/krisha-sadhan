"use client";

import AdminForm from "@/component/AdminForm";


export default function AdminPage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <AdminForm />
    </div>
  );
}