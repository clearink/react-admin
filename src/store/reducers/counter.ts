import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
	name: "counter",
	initialState: { count: 0 },
	reducers: {
		INCREASE(state) {
			console.log(state)
			state.count += 1
		},
		DECREASE(state) {
			state.count -= 1
		},
	},
})
export const { INCREASE, DECREASE } = slice.actions
export default slice.reducer
