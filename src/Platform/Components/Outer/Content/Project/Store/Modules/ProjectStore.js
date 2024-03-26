import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useState} from "react";
import dayjs from "dayjs";

const projectStore = createSlice({
    name: 'project',
    initialState: {
        projectList: []
    },
    reducers: {
        setProjectList(state, action) {
            state.projectList = action.payload
        }
    }
})

const {setProjectList} = projectStore.actions;
const pagination = {
    pageNo: 1,
    pageSize: 10,
}

const GetPagination = () => {
    return pagination
}

const modTime = (data) => {
    data.map((item) => (
        data = dayjs(item.items.createTime).format("YYYY-MM-DD HH:mm:ss")
    ))
}

const GetProjectList = (setLoading) => {
    return async (dispatch) => {
        setLoading = true
        const reqBody = {
            projectId: '',
            projectUrl: '',
            projectName: '',
        };

        const url = "http://localhost:8080/project/projectList";
        const res = await axios.post(url, {pagination, reqBody});

        modTime(Array.isArray(res.data) ? res.data:[])
        console.log(res.data)
        dispatch(setProjectList(res.data))
        setLoading = false
    }
}

export {GetProjectList, GetPagination}
const projectReducer = projectStore.reducer;
export default projectReducer;