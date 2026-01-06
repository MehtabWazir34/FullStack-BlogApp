import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog/")
      .then((res) => setAllBlogs(res.data.blogs))
      .catch((err) => console.error(err));
  }, []);
  

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Blog'Spot
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore fresh ideas, insights, and modern thinking.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {allBlogs.map((blog) => (
          <Link
            to={`/blog/detail/${blog._id}`}
            key={blog._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={blog.blogImg}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {blog.title}
              </h2>

              {/* Highlight / Short Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {blog.description}
              </p>

              <span className="inline-block mt-4 text-sm font-medium text-blue-600">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AllBlogs;
