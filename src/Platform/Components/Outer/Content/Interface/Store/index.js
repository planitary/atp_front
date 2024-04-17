import {configureStore} from "@reduxjs/toolkit";
import interfaceReducer from "./Modules/IntetfaceStore";

const interfaceStore = configureStore({
    reducer: {
        interfaceList: interfaceReducer
    }
})

export default interfaceStore