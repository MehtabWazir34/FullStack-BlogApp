import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function BlogDetails() {
const { id } = useParams();
const [blog, setBlog] = useState(null);


useEffect(() => {
api.get(`/blog/${id}`, {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}).then(res => {setBlog(res.data.blog)

    console.log(res.data.blog);
    
});
}, [id]);


if (!blog) return null;


return (
<div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
  {/* Blog Image */}
  {blog.blogImg && (
    <img
      src={blog.blogImg}
      alt={blog.title}
      className="w-full h-64 object-cover"
    />
  )}

  <div className="p-6 space-y-5">
    {/* Title */}
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
      {blog.title}
    </h1>

    {/* Meta */}
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <span>
        📅 
        {/* {new Date(blog.createdAt).toLocaleDateString()} */}
      </span>
      <span>
        ✍️ Writer's ID: {blog.writer}
      </span>
      <span>
        ❤️ 
        {/* {blog.likes.length} Likes */}
      </span>
      <span>
        💬 
        {/* {blog.comments.length} Comments */}
      </span>
    </div>

    {/* Divider */}
    <hr />

    {/* Blog Content */}
    {/* <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
      {blog.description}
    </p> */}

    {/* Updated Info */}
    <p className="text-xs text-gray-400 pt-4 border-t">
      Last updated on{" "}
      {new Date(blog.updatedAt).toLocaleString()}
    </p>
  </div>
</div>

);
}