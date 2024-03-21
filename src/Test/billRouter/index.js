// 创建路由实例
import {createBrowserRouter} from "react-router-dom";
import Layout from "../billPages/Layout";
import Month from "../billPages/Month";
import Year from "../billPages/Year";
import New from "../billPages/New"

const billRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/month',
                element: <Month/>
            },
            {
                path: '/year',
                element: <Year/>
            }
        ]
    },
    {
        path: "/new",
        element: <New/>,
    }
])

export default billRouter