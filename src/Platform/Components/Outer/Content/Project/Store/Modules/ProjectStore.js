import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useState} from "react";
import dayjs from "dayjs";
import projectDo from "../ProjectDo";

const projectStore = createSlice({
    name: 'project',
    initialState: {
        projectList: [],
    },

    reducers: {
        setProjectList(state, action) {
            state.projectList = action.payload
        },
    }
})

const {setProjectList,fillProjectInfo} = projectStore.actions;
const pagination = {
    pageNo: 2,
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

const GetProjectList = (page, size, projectId = '', projectUrl = '', projectName = '') => {
    return async (dispatch) => {
        const reqBody = {
            pageNo: page,
            pageSize: size,
            projectName: projectName,
            projectUrl: projectUrl,
            projectId: projectId
            // 查询参数
        };

        const url = "http://localhost:8080/project/projectList";
        const res = await axios.post(url, reqBody);

        modTime(Array.isArray(res.data) ? res.data : [])
        console.log(res.data)
        dispatch(setProjectList(res.data))
    }
}

const GetProjectDetail = (projectId) => {
    return async (dispatch) => {
        const reqBody = {
            "projectId":projectId
        }
        const url = "http://localhost:8080/project/getProjectDetail";
        const res = await axios.post(url,reqBody);
        console.log("detail:",res.data)
        dispatch(fillProjectInfo(res.data))
    }
}

export {GetProjectList, GetPagination}
const projectReducer = projectStore.reducer;
export default projectReducer;