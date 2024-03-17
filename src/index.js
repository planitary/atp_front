import {createRoot} from 'react-dom/client'
import App from './App'
import App_L2 from "./App_L2";
import {Provider} from "react-redux";
// import store from "./store";
// 美团项目需要重新引入store
// import store from "./meituan-store",
import ReduxApp from "./ReduxApp";
import Meituan_App from "./meituan-App";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import BillApp from "./BillApp";
import billRouter from "./billRouter";
// 账单项目，导入定制主题文件
import './bill_theme.css'
import billStore from "./billStore";

// 入口主函数，在provider中直接注入要启动的组件即可
const root = createRoot(document.querySelector('#root'))


root.render(
    // 美团的项目用这个
    // <Provider store={store}>
    //     <Meituan_App/>
    // </Provider>
    // 路由项目用这个
    // <RouterProvider router={router}/>
    // 记账本项目
    <Provider store={billStore}>
        <RouterProvider router={billRouter}/>
    </Provider>
)
