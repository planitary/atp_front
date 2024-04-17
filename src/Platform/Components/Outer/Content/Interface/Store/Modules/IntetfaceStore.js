import {createSlice} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "axios";


const interfaceStore = createSlice({
    name: 'interface',
    initialState: {
        interfaceList: [],
    },

    reducers: {
        setInterfaceList(state,action) {
            state.interfaceList = action.payload
        },
    }
})

const {setInterfaceList} = interfaceStore.actions;
const pagination = {
    pageNo: 2,
    pageSize: 10
}

const GetPagination = () => {
    return pagination
}

const modTime = (data) => {
    data.map((item) => (
        data = dayjs(item.items.createTime).format("YYYY-MM-DD HH:mm:ss")
    ))
}

const GetInterfaceList = (page,size,projectId = '',interfaceUrl = '',interfaceName = '') => {
    return async (dispatch) => {
        const reqBody = {
            pageNo: page,
            pageSize: size,
            projectId: projectId,
            interfaceName: interfaceName,
            interfaceUrl: interfaceUrl
        };
        const url = "http://localhost:8080/interface/interfaceList"
        const res = await axios.post(url,reqBody);
        modTime(Array.isArray(res.data) ? res.data : [])
        console.log(res.data)
        dispatch(setInterfaceList(res.data))
    }
}

export {GetInterfaceList,GetPagination}
const interfaceReducer = interfaceStore.reducer;
export default interfaceReducer;