import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name :'channel',
    initialState:{
        channelList: []
    },
    reducers:{
        setChannels(state,action){
            state.channelList = action.payload
        }
    }
})

// 异步请求
const {setChannels} = channelStore.actions
const fetchList = () => {
    return async (dispatch) => {
        const res = await axios.get("https://geek.itheima.net/v1_0/channels")
        dispatch(setChannels(res.data.data.channels))
    }
}

export {fetchList}

const reducer = channelStore.reducer
export default reducer