import axios from "axios";
import { useEffect, useState } from "react";
import MyBlogs from "./MyBlogs";

function SeeProfile() {
  const [theUser, setTheUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seeUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTheUser(res.data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    seeUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!theUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10 px-4 rounded-md">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            My Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{theUser.fullName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">@{theUser.userName}</p>
            </div>

            {theUser.birthDay && (
              <div>
                <p className="text-sm text-gray-500">Birthday</p>
                <p className="font-medium">{new Date(theUser.birthDay).toDateString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* My Blogs Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        
          <MyBlogs />
        </div>

      </div>
    </section>
  );
}

export default SeeProfile;
