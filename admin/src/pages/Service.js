import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate instead of history

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== userId)); // Remove from state
      }
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (userId) => {
    // Navigate to the edit page (e.g., '/edit-user')
    navigate(`/edit-user/${userId}`);
  };

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Phone</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2 text-gray-700">{user.username}</td>
                <td className="px-4 py-2 text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-gray-700">{user.phone}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
