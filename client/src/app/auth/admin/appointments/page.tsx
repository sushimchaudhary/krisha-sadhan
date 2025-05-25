'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Search } from 'lucide-react';



interface Appointment {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  department: string;
  message?: string;
  status: 'pending' | 'done';
}

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/appointments');
      const allAppointments: Appointment[] = res.data.appointments;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayAppointments = allAppointments.filter((app) => {
        const appDate = new Date(app.preferredDate);
        appDate.setHours(0, 0, 0, 0);
        return appDate.getTime() === today.getTime();
      });

      const futureAppointments = allAppointments.filter((app) => {
        const appDate = new Date(app.preferredDate);
        appDate.setHours(0, 0, 0, 0);
        return appDate.getTime() !== today.getTime();
      });

      const sortedAppointments = [
        ...todayAppointments,
        ...futureAppointments.sort(
          (a, b) =>
            new Date(a.preferredDate).getTime() -
            new Date(b.preferredDate).getTime()
        ),
      ];

      setAppointments(sortedAppointments);
    } catch (err) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success('Appointment deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: 'pending' | 'done') => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    if (!window.confirm(`Mark this appointment as ${newStatus}?`)) return;
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Status update failed');
    }
  };

  const filteredAppointments = appointments.filter((app) =>
    [app.fullName, app.phone, app.email, app.department]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Toaster />

      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 px-2">
          <h1 className="text-3xl font-semibold text-blue-800 tracking-tight">
            🩺 Appointment Scheduler
          </h1>

          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name, phone, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-11 pr-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-xs uppercase font-bold text-gray-600">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app, idx) => (
                  <tr key={app._id} className="border-t text-center">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{app.fullName}</td>
                    <td className="px-4 py-2">{app.phone}</td>
                    <td className="px-4 py-2">{app.email}</td>
                    <td className="px-4 py-2">
                      {new Date(app.preferredDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{app.department}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          app.status === 'done' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{app.message || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleStatusToggle(app._id, app.status)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

     
    </div>
  );
};

export default AppointmentScheduler;
