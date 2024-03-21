import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './modules/counterStore'
import channelReducer from "./modules/channelStore";
// 导入子模块reducer
const store = configureStore({
    reducer:{
        counter: counterReducer,
        channel: channelReducer
    }
})

export default store