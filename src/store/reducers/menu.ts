import { createSlice } from "@reduxjs/toolkit"
const slice = createSlice({
	name: "menu",
	initialState: { menu: [] },
	reducers: {
		CHANGE(state, action) {},
	},
})
export const actions = slice.actions
export default slice.reducer
