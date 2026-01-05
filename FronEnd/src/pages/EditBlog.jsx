import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {api, blogAPI_ROUTES } from "../api/axios.js";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  // Fetch existing blog to pre-fill form
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(blogAPI_ROUTES.editBlogAPI, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setForm(res.data.blog);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle main blog update (title/content)
  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title || "");
      formData.append("content", form.description || "");

      await api.put(`/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/my-blogs");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle blog image upload separately
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("blogImg", file);

    try {
      setUploading(true);
      const res = await api.put(`/blog/image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update blog state with new image URL
      setForm((prev) => ({ ...prev, blogImg: res.data.blogImg }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto mt-6 space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      {/* Display current image if exists */}
      {form.blogImg && (
        <img
          src={form.blogImg}
          alt="Blog"
          className="w-full h-64 object-cover rounded-lg mb-2"
        />
      )}

      {/* Image Upload */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          {uploading ? "Uploading..." : "Change Blog Image"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Update
      </button>
    </form>
  );
}
