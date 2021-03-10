import { configureStore } from "@reduxjs/toolkit";
import entriesReducer from "./entries";

export default configureStore({
	reducer: entriesReducer,
	devTools: true,
});
