import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import api from '../api/axios';
import axios from 'axios';
// import { useAuth } from '../Context/authContext';
// import axios from 'axios';

function MenuOpt({setMenuOpt}) {
    // let {logout} = useAuth()
    let navigateTo = useNavigate()
    const handleLogout =async()=>{
      // a.preventDefault();
      // setMenuOpt(false)    
      let token = localStorage.getItem('token')
        try {
            await api.post('/user/logout', 
              {}, //no body parts required
                {headers : {
                    Authorization : `Bearer ${token}`
                },
              }
            );
            
            localStorage.removeItem('token')
            // logout()
            navigateTo('/login')
            console.log("Hmm, loggedout");
        } catch (error) {
            console.log('Soemthing wrong',error);
        }
    }
  return (
    <div className='fixed right-4 top-18  backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 z-50 min-w-50 animate-fade-in'>
        <div>
        <NavLink
        to={`user/:id`}
        onClick={() => setMenuOpt(false)}
        className="flex items-center space-x-3 cursor-pointer transition-all duration-300 rounded-xl p-3 hover:bg-linear-to-r hover:from-blue-200 hover:to-purple-200 hover:text-blue-600 group mb-2"
      >
         {/* <MdOutlineAccountBox className='text-3xl'/> */}

         <span className="font-semibold  group-hover:text-blue-900">My Account</span>
      </NavLink>
        <NavLink
        to={'/createblog'}
        onClick={() => setMenuOpt(false)}
        className="flex items-center space-x-3 cursor-pointer transition-all duration-300 rounded-xl p-3 hover:bg-linear-to-r hover:from-blue-200 hover:to-purple-200 hover:text-blue-600 group mb-2"
      >
         {/* <MdOutlineAccountBox className='text-3xl'/> */}

         <span className="font-semibold  group-hover:text-blue-900">Create blog</span>
      </NavLink>
        <button type='button'
        // to={'/profile'}
        
        onClick={handleLogout}
        className="flex items-center space-x-3 cursor-pointer transition-all duration-300 rounded-xl p-3 hover:bg-linear-to-r hover:from-blue-200 hover:to-purple-200 hover:text-blue-600 group mb-2"
      >
         {/* <MdOutlineAccountBox className='text-3xl'/> */}

         <span className="font-semibold  group-hover:text-blue-900">Logout</span>
      </button>
        </div>
    </div>
  )
}

export default MenuOpt
