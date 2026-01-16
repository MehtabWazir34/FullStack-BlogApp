import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import MenuOpt from "./components/MenuOpt";
import LoginAccount from "./MyPages/LoginAccount.jsx";
import CreateAccount from "./MyPages/CreateAccount.jsx";
import NewBlog from "./MyPages/NewBlog.jsx";
import MyBlogs from "./MyPages/MyBlogs.jsx";
import AllBlogs from "./MyPages/AllBlogs.jsx";
import BlogDetails from "./MyPages/BlogDetails.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import SeeProfile from "./MyPages/SeeProfile.jsx";

export default function App() {


  const [menuOpt, setMenuOpt] = useState(false)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-gray-500 to-gray-700">
            <Navbar
              menuOpt = {()=>setMenuOpt(!menuOpt)}
        />
      <main className="max-w-7xl mx-auto px-4 py-8">

          <Routes>
            <Route path="/login" element={ <LoginAccount/>} />
            <Route path="/register" element={<CreateAccount />} />

            <Route path="createblog" element={
              <ProtectedRoute>
                <NewBlog/>
              </ProtectedRoute>
            } />
            <Route path="/myblogs" element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            } />

            <Route path="/" element={
              <ProtectedRoute>
                <AllBlogs />
              </ProtectedRoute>
            } />
            <Route path={`/blog/detail/:id`} element = {
              <ProtectedRoute>
                <BlogDetails/>
              </ProtectedRoute>
            } />

            <Route
              path="/blog/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route path="/user/:id" element={
                <ProtectedRoute>
                  <SeeProfile />
                </ProtectedRoute>  
              } />
          </Routes>
          {
            menuOpt && (
              <MenuOpt setMenuOpt={menuOpt} />
            )
          }
        </main>
      </div>
    </BrowserRouter>
  );
}
