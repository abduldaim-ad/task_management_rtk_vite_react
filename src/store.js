import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";

const store = configureStore({
    reducer:{
        tasks: taskSlice
    }
})

export default store;