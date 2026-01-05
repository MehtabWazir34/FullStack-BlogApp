import { useEffect, useState } from "react";
import {api, blogAPI_ROUTES } from "../api/axios.js";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(blogAPI_ROUTES.myBlogsAPI, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Ensure it's an array
        setBlogs(Array.isArray(res.data.blogs) ? res.data.blogs : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
     <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {blogs.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* Blog Image */}
              {b.blogImg ? (
                <img
                  src={b.blogImg}
                  alt={b.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* Blog Content */}
              <div className="p-5 flex flex-col grow">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                  {b.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3 grow">
                  {b.description}
                </p>

                {/* Meta Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>
                    📅 {new Date(b.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-4">
                    <span>❤️ {b.likes.length}</span>
                    <span>💬 {b.comments.length}</span>
                  </div>
                </div>

                {/* Edit Link */}
                <Link
                  to={`/edit/${b._id}`}
                  className="mt-3 inline-block text-indigo-600 font-medium hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
