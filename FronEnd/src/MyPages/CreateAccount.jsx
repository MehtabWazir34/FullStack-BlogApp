import axios from "axios";
import { useState } from "react";
import { Input, Label } from "../Inputs/Input";
import LoginAccount from "./LoginAccount";
import { useNavigate } from "react-router-dom";
// import axios, { api, userAPI_ROUTES } from "../api/axios.js";

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    birthDay: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  let navigateTo = useNavigate()

  // const (a)=> setFormData({...formData, userName: a.target.value}) = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/user/register', formData)
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
      navigateTo('/user/profile')
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
            <Label lblFor={'fullName'} lblName={'FullName'} />
            <Input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(a)=> setFormData({...formData, fullName: a.target.value})}
              placeholder="e.g: Wazir Khan"
              // className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={'required'}
            />
          </div>

          <div>
            <Label lblFor={'userName'}
              lblName={'UserName'}
            />
            <Input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={(a)=> setFormData({...formData, userName: a.target.value})}
              placeholder="e.g: wazir34"
              required={'required'}
            />
          </div>

          <div>
            <Label lblFor="birthDay" 
              lblName={'Date of Birth'}
            />
            <Input
              type="date"
              id="birthDay"
              value={formData.birthDay}
              onChange={(a)=> setFormData({...formData, birthDay: a.target.value})}
              required={'required'}
            />
          </div>

          <div>
            <Label lblFor="password"
              lblName={'Password'}
            />
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={(a)=> setFormData({...formData, password: a.target.value})}
              placeholder="Minimum 6 characters"
              required={'required'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center my-4">Already have an account? <a href="/login" className="underline text-blue-700">Login Now</a></p>
      </div>
    </div>
  );
}

export default CreateAccount;
