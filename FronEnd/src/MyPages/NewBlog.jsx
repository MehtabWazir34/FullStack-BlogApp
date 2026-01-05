import axios from "axios";
import { useState } from "react"
// import {api, blogAPI_ROUTES} from '../api/axios.js'

function NewBlog(){
    const [formData, setFormData] = useState({});

    const createBlog = async(a)=>{
        a.preventDefault();
        let token = localStorage.getItem('token')
        try {
            let theBlog = await axios.post('http://localhost:3000/blog/newblogpost', formData,
                {
                    headers :{
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            
            console.log(theBlog);
        } catch (error) {
            console.log(`Error: ${error}`);
            
        }
        
    }
    return(
        <div className="w-1/2 p-4 rounded-md bg-amber-50">
            <form onSubmit={createBlog}>
                <div>
                <label htmlFor="blogImg">blogImg</label>
                <input type="text" id="blogImg" placeholder="blogImg" onChange={(a)=> setFormData({...formData, blogImg : a.target.value})} />

                </div>
                <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Title" onChange={(a)=> setFormData({...formData, title : a.target.value})} />

                </div>
                <div>
                <label htmlFor="description">description</label>
                <textarea type="text" id="description" placeholder="description" onChange={(a)=> setFormData({...formData, description : a.target.value})} />

                </div>
                <div>
                    <button type="submit">Post Now</button>
                </div>
            </form>
        </div>
    )
}
export default NewBlog