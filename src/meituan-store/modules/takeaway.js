// 编写store
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        // 商品列表
        foodsList: [],
        //  菜单激活active
        activeIndex: 0,
    },
    reducers:{
        setFoodsList(state,action){
            state.foodsList = action.payload
        },
        changeActiveIndex(state,action){
            state.activeIndex = action.payload
        }
    }
})

// 异步请求
const {setFoodsList,changeActiveIndex} = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get("  http://localhost:3004/takeaway")
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export {fetchFoodsList,changeActiveIndex}

const reducer = foodsStore.reducer
export default reducer