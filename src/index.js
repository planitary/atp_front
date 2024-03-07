import { createRoot } from 'react-dom/client'
import App from './App'
import App_L2 from "./App_L2";
import {Provider} from "react-redux";
// import store from "./store";
// 美团项目需要重新引入store
import store from "./meituan-store"
import ReduxApp from "./ReduxApp";
import Meituan_App from "./meituan-App";

// 入口主函数，在provider中直接注入要启动的组件即可
const root = createRoot(document.querySelector('#root'))

root.render(
    <Provider store={store}>
        <Meituan_App/>
    </Provider>
    )
