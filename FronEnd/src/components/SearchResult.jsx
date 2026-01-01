import { NavLink } from "react-router-dom";

export default function SearchResults({ users, clearResults }) {
  if(!users.length) {
    return (
      <div className="bg-white w-[25vw] mx-auto rounded shadow absolute left-[50%] top-[12%] z-50 p-4">
        <p className="text-center text-gray-500">User not found</p>
      </div>
    );
  }
  // console.log(users);
  
  return (
    <div className="bg-white w-[25vw] mx-auto rounded shadow absolute left-[50%] top-[12%] z-50">
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="border-b last:border-none hover:bg-gray-100"
          >
            <NavLink
              to={`/user/${user._id}`}
              onClick={clearResults}
              className="block px-4 py-3"
            >
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
