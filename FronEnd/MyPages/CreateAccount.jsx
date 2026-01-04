import axios from "axios";
import { useState } from "react"
import api from "../src/api/axios";

function CreateAccount (){
    const [formData, setFormData] = useState({});
    const submitForm = async(a)=>{
        a.preventDefault()
        let res = await api.post('/user/register', formData);
        localStorage.setItem('token', res.data.token);
        console.log(res);
        
    }
    return (
        <div className="max-w-1/3 p-4 bg-blue-600 rounded-md">
            <div className="text-center">
                <h4 className="text-sm my-2 animate-bounce hover:animate-none hover:text-amber-500 transition-all duration-150">Welcome to the Blog'Spot</h4>
                <h2 className="text-xl">Create your blog account</h2>
            </div>
            <form onSubmit={submitForm} >
                <div>
                <label htmlFor="fullName">FullName</label>
                <input type="text" id="fullName" placeholder="Enter your full name"
                onChange={(a)=> setFormData({...formData, fullName: a.target.value })} />
                </div>
                <div>
                <label htmlFor="userName">UserName</label>
                <input type="text" id="userName" placeholder="set your username"
                onChange={(a)=> setFormData({...formData, userName: a.target.value })} />
                </div>
                <div>
                <label htmlFor="birthDay">birthDay</label>
                <input type="date" id="birthDay" placeholder="Enter your birthDay"
                onChange={(a)=> setFormData({...formData, birthDay: a.target.value })} />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="min 06 characters"
                onChange={(a)=> setFormData({...formData, password: a.target.value })} />
                </div>

                <button type="submit" className="mx-auto p-2 bg-blue-800 rounded-md cursor-pointer hover:bg-blue-900 transition-colors duration-200">Create Now</button>

            </form>
        </div>
    )
}

export default CreateAccount