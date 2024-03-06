import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './modules/counterStore'
// 导入子模块reducer
const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})

export default store