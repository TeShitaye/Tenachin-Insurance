import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [regularUsers, setRegularUsers] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [regularResponse, premiumResponse] = await Promise.all([
          axios.get("http://localhost:5000/users"),
          axios.get("http://localhost:5000/premiumusers"), // Add a new route for premium users
        ]);
    
        setRegularUsers(regularResponse.data);
        setPremiumUsers(premiumResponse.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleDelete = async (userId, isPremium) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      if (isPremium) {
        setPremiumUsers(premiumUsers.filter(user => user._id !== userId));
      } else {
        setRegularUsers(regularUsers.filter(user => user._id !== userId));
      }
    } catch {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = userId => {
    navigate(`/edit-user/${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderTable = (users, title, isPremium) => (
    <div className="m-8  ">
      <h2 className="text-2xl font-bold text-white py-4" >{title}</h2>
      <table className="min-w-full border bg-white ">
        <thead>
          <tr className="">
            <th className="border  px-4 py-2 text-blue-600 border-blue-700 bg-gray-100">Name</th>
            <th className="border px-4 py-2 text-blue-600 border-blue-700 bg-gray-100">Email</th>
            <th className="border px-4 py-2 text-blue-600 border-blue-700 bg-gray-100">Phone</th>
            <th className="border px-4 py-2 text-blue-600 border-blue-700 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border border-black px-4 py-2 text-center">{user.username}</td>
              <td className="border border-black px-4 py-2 text-center">{user.email}</td>
              <td className="border border-black px-4 py-2 text-center">{user.phone}</td>
              <td className="border border-black py-2 text-center">
                <button className="mx-8 bg-green-500 px-4 rounded-xl text-white text-lg font-bold hover:bg-green-900" onClick={() => handleEdit(user._id)}>Edit</button>
                <button className="bg-red-500 px-4 rounded-xl text-white text-lg font-bold hover:bg-red-900" onClick={() => handleDelete(user._id, isPremium)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="bg-gradient-to-t from-slate-600 to-slate-400 h-full py-8 px-4">
      <h1 className="text-3xl font-extrabold text-white">User Management</h1>
      {renderTable(regularUsers, "Regular Users", false)}
      {renderTable(premiumUsers, "Premium Users", true)}
    </div>
  );
};

export default Users;
