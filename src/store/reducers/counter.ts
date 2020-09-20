import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
	name: "counter",
	initialState: { count: 0 },
	reducers: {
		increase(state) {
			state.count += 1
		},
		decrease(state) {
			state.count -= 1
		},
	},
})
export const actions = slice.actions
export default slice.reducer
