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
        // 购物车列表
        cartList: []

    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        addCart(state, action) {
            // 是否添加过,用action.payload.id去cartList中查找，如果有，则添加过
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        // 购物车增减(关键点:要找到进行操作的对象）
        itemPlus(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        itemMinus(state,action){
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item.count === 0){
                return
            }
            item.count--
        },
        // 清空购物车
        cartClear(state){
            state.cartList = []
        }
    }
})

// 异步请求
const {setFoodsList, changeActiveIndex, addCart,itemPlus,itemMinus,cartClear} = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get("  http://localhost:3004/takeaway")
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export {fetchFoodsList, changeActiveIndex, addCart,itemPlus,itemMinus,cartClear}

const reducer = foodsStore.reducer
export default reducer