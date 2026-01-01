import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;                          

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await api.put("/user/update-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);
      
      // Update user state with new image
      setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex items-center gap-4">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
          <p className="text-indigo-100">@{user.username}</p>
        </div>
      </div>

      {/* Upload Button */}
      <div className="p-6 flex items-center gap-4">
        <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          {uploading ? "Uploading..." : "Change Profile Image"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              user.verified
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {user.verified ? "✔ Verified" : "Not Verified"}
          </span>
        </div>

        {/* Info */}
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(user.dob).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
          <div>
            <p className="text-lg font-bold text-gray-800">{user.blogs.length}</p>
            <p className="text-xs text-gray-500">Blogs</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{user.followers.length}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{user.following.length}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
