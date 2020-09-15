import { createSlice } from "@reduxjs/toolkit"
const { actions, reducer } = createSlice({
	name: "menu",
	initialState: { menu: [] },
	reducers: {
		CHANGE(state, action) {},
	},
})
export const { CHANGE } = actions
export default reducer
