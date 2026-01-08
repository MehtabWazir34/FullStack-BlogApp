import api from "../api/axios";
import { useState } from "react";
import { Input, Label } from "../Inputs/Input";
import { useNavigate } from "react-router-dom";

function NewBlog() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  let navigateTo = useNavigate()

  const createBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const res = await api.post(
        "/blog/newblogpost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog has been created.")
      console.log(res);
      setLoading(false);
      navigateTo('/myblogs')
    } catch (error) {
      console.error("Error creating blog:", error);
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Blog
          </h1>
          <p className="text-gray-600 mt-1">
            Share your thoughts with the world
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createBlog} className="space-y-6">
          
          {/* Blog Image */}
          <div>
            <Label lblFor={'blogImg'} lblName={'Image URL'} />
            <Input
            value={formData.blogImg}
            id={'blogImg'}
              type="text"
              placeholder="https://example.com/image.jpg"
              onChange={(e) =>
                setFormData({ ...formData, blogImg: e.target.value })
              }
            />
          </div>

          {/* Title */}
          <div>
           <Label lblFor='title' lblName={'Title'} />
            <Input value={formData.title} id={'title'} type={'text'} placeholder={'Enter blog title'} onChange={a =>setFormData({...formData, title : a.target.value})}/>
          </div>

          {/* Description */}
          <div>
            <Label lblFor={'description'} lblName={'Description'} />
            <textarea
              id="description"
              rows="6"
              placeholder="Write your blog content here..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-l-black focus:border-b-black focus:border-2 "
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer md:w-auto px-8 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewBlog;
