import { Link, Links, NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import MenuOpt from "./MenuOpt";
import { useAuth } from "../Context/authContext";
// import { useAuth } from "../../../backend/middlewares/authContext";
// import authCheck from "../../../backend/middlewares/authCheck";

export default function Navbar({  searchQuery,
  setSearchQuery,
  setSearchResults,
  setShowResults, menuOpt
}) {

  const {isAuthenticated} = useAuth()
  // let [authCheck, setAuth] = useState(false)
  // useEffect(()=>{
  //    setAuth(Boolean(localStorage.getItem('token')))
    
  // },[])
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold  text-indigo-600 tracking-tight"
        >
          Blogify ✍️
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <div>
            {/* <input type="text" placeholder="Search creator" className="py-2 px-4 text-white rounded-full bg-indigo-600 w-full" /> */}
            <SearchUser  searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSearchResults={setSearchResults}
              setShowResults={setShowResults}
            />
          </div>
          <Link className="text-gray-600 hover:text-indigo-600" to="/">
            Blogs
          </Link>
          <Link className="text-gray-600 hover:text-indigo-600" to="/myblogs">
            My Blogs
          </Link>
          <div
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
            // to="/create"
          >
            {/* Create */}
            {
              isAuthenticated ? (
                <button
                onClick={ menuOpt} >
            Setting
          </button> 
          ) : (
            <NavLink to={'/login'}>
              Login
            </NavLink>
          )
              }
          </div>
        </div>
      </div>
    </nav>
  );
}
