import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => { setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
      
      <div className="p-6 flex items-center gap-6 border-b">
        <img
          src={user.profilePic || "/default-avatar.png"}
          alt={user.fullName}
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.fullName}
          </h1>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-400 mt-1">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 text-center">
        <div>
          <p className="text-2xl font-bold">{user.blogCount}</p>
          <p className="text-gray-500">Blogs</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.followers?.length || 0}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.totalViews}</p>
          <p className="text-gray-500">Views</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.totalLikes}</p>
          <p className="text-gray-500">Likes</p>
        </div>
      </div>

    </div>
  );
}

