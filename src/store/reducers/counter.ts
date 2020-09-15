import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const { actions, reducer } = createSlice({
	name: "counter",
	initialState: { count: 0 },
	reducers: {
		INCREASE(state, action: PayloadAction<number>) {
			state.count += action.payload
		},
		DECREASE(state) {
			state.count -= 1
		},
	},
})
export const { INCREASE, DECREASE } = actions
export default reducer
