import { useState } from "react"
import api, { apiROUTES } from "../api/axios";

function LoginAccount(){
    const [userName, setname] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async(a)=>{
        a.preventDefault();
        let res = await api.post(apiROUTES.loginAPI, {userName, password});
        localStorage.setItem('token', res.data.token);
        console.log(res);
        
    }
    return(
        <div className="max-w-1/3 bg-blue-600 rounded-md place-items-center p-4 text-center">
            <div>
                <h4 className="text-sm animate-bounce hover:animate-none hover:text-amber-500">Login to active on Blog'Spot</h4>
                <h2 className="text-xl ">Welcome back!</h2>
            </div>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id="username" placeholder="Username" onChange={(a)=> setname(a.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="password"
                    onChange={(a)=>setPassword(a.target.value)} />
                </div>

                <button className="mx-auto rounded-md bg-blue-800 hover:bg-blue-900 cursor-pointer transition-all duration-200" type="submit">Login Now</button>
            </form>
        </div>
    )
}

export default LoginAccount