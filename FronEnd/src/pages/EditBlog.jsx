import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Label } from "../Inputs/Input";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [title, setTitle] = useState('');
  // const [description, setDesc] = useState('');
  const [formData, setForm] = useState({
    title:" ", description: " ",
  });

  useEffect(() => {
    if(!id) return null
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blog/edit/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        setForm({
          title: res.data.blog.title,
          description: res.data.blog.description
        })
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
    // console.log(fetchBlog);
    
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/blog/edit/${id}`, {
        title: formData.title, description: formData.description,
      }, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/myblogs");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl h-4/5 mx-auto mt-6 space-y-4 bg-white shadow-2xl rounded-md p-6">
      <Label lblFor={'title'} lblName={'Title'}/>
      <Input
        id={"title"}
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setForm({...formData, title: e.target.value })}
        required={'required'}
      />

      <Label lblFor={'desc'} lblName={'Description'} />
      <textarea
        id="desc"
         className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-l-black focus:border-b-black focus:border-2 "
        placeholder="Content"
        value={formData.description}
        onChange={(e) => setForm({...formData, description:e.target.value} )}
        required
      />


      <div className="flex justify-center">
        
      <button
        type="submit"
        className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
        Update
      </button>
        </div>
    </form>
  );
}
