import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// import Blogs from "./pages/Blogs";
// import BlogDetails from "./pages/BlogDetails";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import MyBlogs from "./pages/MyBlogs";
// import CreateBlog from "./pages/CreateBlog";
// import EditBlog from "./pages/EditBlog";
// import Profile from "./pages/Profile";
import { useState } from "react";
// import SearchResults from "./components/SearchResult";
// import UserProfile from "./components/UserProfile";
import MenuOpt from "./components/MenuOpt";
import LoginAccount from "./MyPages/LoginAccount.jsx";
import CreateAccount from "./MyPages/CreateAccount.jsx";
import NewBlog from "./MyPages/NewBlog.jsx";
import MyBlogs from "./MyPages/MyBlogs.jsx";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [menuOpt, setMenuOpt] = useState(false)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-gray-500 to-gray-700">
            <Navbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSearchResults={setSearchResults}
              setShowResults={setShowResults}
              menuOpt = {()=>setMenuOpt(!menuOpt)}
        />
      <main className="max-w-7xl mx-auto px-4 py-8">
              {showResults && (
                <SearchResults
                  users={searchResults}
                  clearResults={() => setShowResults(false)}
                />
              )}

          <Routes>
            {/* <Route path="/" element={<Blogs />} /> */}
            {/* <Route path="/loginn" element={<Login/>} /> */}
            {/* <Route path="signup" element={<Signup/>} /> */}
            <Route path="/login" element={ <LoginAccount/>} />
            <Route path="/register" element={<CreateAccount />} />

            <Route path="createblog" element={
              <ProtectedRoute>
                <NewBlog/>
              </ProtectedRoute>
            } />
            <Route path="myblogs" element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            } />

            {/* <Route path="/user/:id" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>  
              } />

            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <BlogDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-blogs"
              element={
                <ProtectedRoute>
                  <MyBlogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <ne />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blog/update/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> */}

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
