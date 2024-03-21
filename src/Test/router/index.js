import Login from "../page/Login";
import Article from "../page/Article";
import {createBrowserRouter} from "react-router-dom";
import {createHashRouter} from "react-router-dom";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound from "../page/NotFound";
import {RouterProvider} from "react-router-dom";

//  配置路由,如果使用params形式的传参,目标路由需要使用占位符,即Restful风格
const router = createHashRouter([
    // 普通路由
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
    },
    // 嵌套路由
    {
        path: '/',
        element: <Layout/>,
        // 二级路由
        children: [
            {
                // 不带path以及配置了index属性为true则为二级默认路由
                // path: '/about',
                index: true,
                element: <About/>
            },
            {
                path: '/board',
                element: <Board/>
            }
        ]
    },
    // 404兜底路由（注意一定要在最后）
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router