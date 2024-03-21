import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <div>我是登录</div>
    },
    {
        path: '/article',
        element: <div>我是文章</div>
    }
])

const root = createRoot(document.querySelector('#root'))
root.render(
    <RouterProvider router={router}/>
)
