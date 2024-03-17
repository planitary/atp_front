import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: 'bill',
    // 数据状态
    initialState:{
        billList: []
    },
    reducers: {
        setBillList(state,action){
            state.billList = action.payload
        }
    }
})


// 解构
const {setBillList} = billStore.actions;
// 异步
const getBillList = () => {
    return async (dispatch) => {
        // 异步请求
        const res = await axios.get("http://localhost:3004/ka")
        dispatch(setBillList(res.data))
    }
}

export {getBillList}
const billReducer = billStore.reducer;
export default billReducer;
