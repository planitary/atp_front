import {configureStore} from "@reduxjs/toolkit";
import reducer from "./Modules/ProjectStore";

const projectStore = configureStore({
    reducer:{
        // 在这里添加监听的reducer
        projectList: reducer,
        interfaceList: reducer,
        caseSetList: reducer
    }
})

export default projectStore