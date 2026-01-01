import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function CreateBlog() {
const [form, setForm] = useState({});
const navigate = useNavigate();


const submit = async e => {
e.preventDefault();
const response = await api.post(
  "/blog/create",
  form, // 👈 request body
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);


console.log(response);

// navigate("/my-blogs");
};


return (
<form onSubmit={submit} className="max-w-xl mx-auto mt-6 space-y-4">
<input className="w-full border p-2" placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})} />
<textarea className="w-full border p-2" placeholder="Content" onChange={e=>setForm({...form,content:e.target.value})} />
<button className="bg-black text-white px-4 py-2">Create</button>
</form>
);
}