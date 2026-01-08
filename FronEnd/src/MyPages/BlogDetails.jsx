import api from "../api/axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function BlogDetails (){
    let {id} = useParams();
    const [blog, setBlog] = useState(null);

useEffect(()=>{
    api.get( `/blog/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        },
    ).then((res)=>{ setBlog(res.data.blog) 
        console.log(res.data.blog);
    })
}, [id]);

if(!blog) return null

    return (
        <section className="w-full min-h-screen bg-gray-50 py-10 px-4 rounded-md">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Image */}
        {blog.blogImg && (
          <div className="overflow-hidden">
            <img
              src={blog.blogImg}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>
              {blog.createdAt &&
                new Date(blog.createdAt).toLocaleDateString()}
            </span>

            {/* {blog.writer && <span>Writer: {blog.writer}</span>}

            {blog.likes && <span>{blog.likes.length} Likes</span>}

            {blog.comments && <span>{blog.comments.length} Comments</span>} */}
          </div>

          <hr />

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {blog.description}
          </p>

          {/* Footer */}
          {blog.updatedAt && (
            <p className="text-xs text-gray-400 pt-4 border-t">
              Last updated on{" "}
              {new Date(blog.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </section>
    )
}
export default BlogDetails