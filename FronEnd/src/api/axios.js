import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

export const userAPI_ROUTES = {
    registerAPI : '/user/register',
    loginAPI : '/user/login',
    logoutAPI: '/user/logout',
    updatePROFILE : '/user/updateprofile',
    seePROFILE : '/user/profile'

}
export const blogAPI_ROUTES = {
    newBlogAPI : '/blog/newblogpost',
    myBlogsAPI : '/blog/me',
    editBlogAPI : '/blog/edit/:id',
    deleteBlogAPI : '/blog/:id',
    blogDetailAPI : `/blog/detail/:id`,
    allBlogsAPI : '/blog/'

}
// export default {api, userAPI_ROUTES, blogAPI_ROUTES}