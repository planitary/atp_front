import Login from "../page/Login";
import Article from "../page/Article";
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router-dom";

//  配置路由,如果使用params形式的传参,目标路由需要使用占位符,即Restful风格
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/article/:id',
        element: <Article/>
    },
    {
        path: '/article',
        element: <Article/>
    }
])

export default router