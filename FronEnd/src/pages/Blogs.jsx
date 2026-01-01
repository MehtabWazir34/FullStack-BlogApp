import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";


export default function Blogs() {
const [blogs, setBlogs] = useState([]);


useEffect(() => {
api.get("/blog/blogs", {
    
}).then(res => setBlogs(res.data.blogs));
}, []);


return (
<div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
  {blogs.map((b) => (
    <Link
      key={b._id}
      to={`/blog/${b._id}`}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      {/* Blog Image */}
      {b.blogImage ? (
        <img
          src={b.blogImage}
          alt={b.title}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="h-44 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
          {b.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {b.content}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <span>
            {new Date(b.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-4">
            <span>❤️ {b.likes.length}</span>
            <span>💬 {b.comments.length}</span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

);
}