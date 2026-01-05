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
        try {
        let res = await axios.post('http://localhost:3000/user/login', {userName, password});
        localStorage.setItem('token', res.data.token);
        console.log(res, res.data);
          
        } catch (error) {
          console.log(`Error: ${error} , ${error.message}`);
          
        } finally{
          setLoading(false)
        }
        
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
              placeholder="e.g: wazir34"
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
              placeholder="your password"
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