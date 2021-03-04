import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 存储用户选择的床位
interface Item {
	label: string
	value: string
}
const slice = createSlice({
	name: "monitor",
	initialState: [] as Array<Item>,
	reducers: {
		// 设置
		setList(state, action: PayloadAction<Item[]>) {
			return action.payload
		}, 
	},
})
export const actions = { ...slice.actions }
export default slice.reducer
