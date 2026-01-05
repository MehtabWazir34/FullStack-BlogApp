import axios from "axios";
import { useState } from "react";
// import axios, { api, userAPI_ROUTES } from "../api/axios.js";

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    birthDay: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/user/register', formData)
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Join Blog'Spot and start blogging!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-4">
          
          <div>
            <label htmlFor="fullName" className="block text-sm text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g: Wazir Khan"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="userName" className="block text-sm text-slate-600">
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="e.g: wazir34"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="birthDay" className="block text-sm text-slate-600">
              Date of Birth
            </label>
            <input
              type="date"
              id="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
