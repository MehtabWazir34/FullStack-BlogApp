import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

const userAPI_ROUTES = {
    registerAPI : '/user/register',
    loginAPI : '/user/login',
    logoutAPI: '/user/logout',
    updatePROFILE : '/user/updateprofile',
    seePROFILE : '/user/profile'

}
const blogAPI_ROUTES = {
    newBlogAPI : '/blog/newblogpost',
    myBlogsAPI : '/blog/me',
    editBlogAPI : '/blog/edit/:id',
    deleteBlogAPI : '/blog/:id',
    blogDetailAPI : '/blog/detail/:id',
    allBlogsAPI : '/blog/'

}
export default {api, userAPI_ROUTES, blogAPI_ROUTES}