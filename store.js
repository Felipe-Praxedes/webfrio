import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./src/slices/navSlices";

export const store = configureStore({
    reducer:{
        nav: navReducer,
    },
});