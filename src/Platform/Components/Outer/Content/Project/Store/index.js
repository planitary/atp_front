import {configureStore} from "@reduxjs/toolkit";
import projectReducer from "./Modules/ProjectStore";

const projectStore = configureStore({
    reducer:{
        projectList: projectReducer
    }
})

export default projectStore