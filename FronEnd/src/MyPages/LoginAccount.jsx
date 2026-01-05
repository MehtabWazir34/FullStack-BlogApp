import { useState } from "react"
// import  {api, userAPI_ROUTES } from "../api/axios.js";
import axios from "axios";

function LoginAccount(){
    const [userName, setname] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async(a)=>{
        setLoading(true)
        a.preventDefault();
        let res = await axios.post('/user/login', {userName, password});
        localStorage.setItem('token', res.data.token);
        console.log(res);
        
    }
    return(
           <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome back!
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Login to Blog'Spot and continue blogging.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-4">
          
          <div>
            <label htmlFor="fullName" className="block text-sm text-slate-600">
              User Name
            </label>
            <input
              type="text"
              id="fullName"
              value={userName}
              onChange={(a)=> setname(a.target.value)}
              placeholder="John Doe"
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
              value={password}
              onChange={(a)=> setPassword(a.target.value)}
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
            {loading ? "Logging in..." : "Login Now"}
          </button>
        </form>
      </div>
    </div>
    )
}

export default LoginAccount