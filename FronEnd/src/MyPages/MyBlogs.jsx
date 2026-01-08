import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function MyBlogs(){
    const [myBlogs, setMyBlogs] = useState([]);
    const [delBlog, setDelBlog] = useState(null)

    useEffect(()=>{
        const getMyBlogs = async()=>{
            // a.preventDefault();
            let token = localStorage.getItem('token')
            try {
                let theBlogs = await axios.get('http://localhost:3000/blog/me',{
                    headers:{Authorization :`Bearer ${token}`}
                });
                setMyBlogs(Array.isArray(theBlogs.data.blogs) ? theBlogs.data.blogs : []);
                
              } catch (error) {
                console.log(`Err: ${error}`);
                
              }
              console.log("Your blogs has been fetched.");
        }
        getMyBlogs()
    },[])

    // let {id} = useParams()

    const DeleteBlog = async(id)=>{
      alert("Blog has been deleted.")
      try {
        await axios.delete(`http://localhost:3000/blog/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }).then((res)=> setDelBlog(res.data.blog))
      } catch (error) {
        console.log("error:", error);
        
      }
    }

    
    return(
      <>
          {myBlogs.length === 0 && (
            <div className="w-full min-h-4/5 bg-white p-6 rounded-md">
              <h1 className="text-3xl font-bold mb-8 text-left">My Blogs <span>({myBlogs.length})</span></h1>
    
            <div className="grid gap-y-4 place-items-center">
            <p className="text-gray-500 text-center">No blogs found.</p>
            <Link to={'/createblog'} className="bg-blue-700 rounded-md hover:bg-blue-800 text-white cursor-pointer p-2">
            Create now your first blog post.
            </Link>
            </div>
            </div>
          ) }

      { myBlogs.length !== 0 &&
        (
          <div className="w-full min-h-screen bg-gray-50 py-10 px-4 rounded-md">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          <h1 className="text-3xl font-bold mb-8">My Blogs <span>({myBlogs.length})</span></h1>
          {myBlogs.map((b) => (
            <div key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
            <Link
              to={`/blog/detail/${b._id}`}
              key={b._id}
              // className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
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
                <p className="text-gray-600 mt-2 line-clamp-4 text-sm grow">
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
              </div>
            </Link>
                <div className="flex justify-between px-6">

                <Link
                  to={`/blog/edit/${b._id}`}
                  className=" inline-block text-indigo-600 font-medium hover:underline"
                  >
                  Edit
                </Link>
                <button onClick={()=>DeleteBlog(b._id)} className="cursor-pointer  inline-block text-indigo-600 font-medium hover:underline">Delete</button>
                  </div>
              </div>
          )
        )
          }
        </div>
    </div>
      )
    }
    
    </>
    )
}
export default MyBlogs