import { createSlice } from "@reduxjs/toolkit";

const entriesSlice = createSlice({
	name: "entries",
	initialState: {},
	reducers: {
		doReceiveEntries: (state, action) => (state = action.payload),
		doAddEntry: (state, action) => state + action.payload,
	},
});

export default entriesSlice.reducer;
