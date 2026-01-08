import { useState } from "react"
// import  {api, userAPI_ROUTES } from "../api/api.js";
import api from "../api/axios";
import { Input, Label } from "../Inputs/Input";
import { useNavigate } from "react-router-dom";

function LoginAccount(){
    const [userName, setname] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let navigateTo = useNavigate()

    const submitForm = async(a)=>{
        setLoading(true)
        a.preventDefault();
        try {
        let res = await api.post('/user/login', {userName, password});
        localStorage.setItem('token', res.data.token);
        console.log(res, res.data);
          
        } catch (error) {
          console.log(`Error: ${error} , ${error.message}`);
          
        } finally{
          setLoading(false)
          navigateTo('/')
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
            <Label lblFor="fullName"
              lblName={'User Name'}
            />
            <Input
              type="text"
              id="fullName"
              value={userName}
              onChange={(a)=> setname(a.target.value)}
              placeholder="e.g: wazir34"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={'required'}
            />
          </div>

          <div>
            <Label lblFor="password" 
              lblName = {'Password'}
            />
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(a)=> setPassword(a.target.value)}
              placeholder="your password"
              required={'required'}
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
        <p className="text-center my-4">Don't have an account? <a href="/register" className="underline text-blue-700">Create Now</a></p>
      </div>
    </div>
    )
}

export default LoginAccount