import billReducer from "./modules/billStore";
import {configureStore} from "@reduxjs/toolkit";

const billStore = configureStore({
    reducer: {
        bill: billReducer
    }
})

export default billStore