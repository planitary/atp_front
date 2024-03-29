// redux子模块
import {createSlice} from "@reduxjs/toolkit";

const counterStore = createSlice({
    name :'counter',
    // 初始化state
    initialState:{
        count: 0
    },
    // 修改数据的方法（同步方法，支持直接修改）
    reducers:{
        increment(state) {
            state.count ++
        },
        decrement(state){
            state.count --
        },
        addToNum(state,action){
            state.count += action.payload
        },
        reduceToNum(state,action){
            state.count -= action.payload
        }
    }
})

// 解构actionCreater函数
const {increment,decrement,addToNum,reduceToNum} = counterStore.actions;
// 获取reducer
const reducer = counterStore.reducer
// 按需导出方式导出actionCreator
export {increment,decrement,addToNum,reduceToNum}
// 默认导出方式导出reducer
export default reducer
