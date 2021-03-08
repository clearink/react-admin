import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import BedListUtil, { BedListItem } from "@/utils/store/BedUtil"

// 存储用户选择的床位

const slice = createSlice({
	name: "monitor",
	initialState: { list: BedListUtil.getBedList() },
	reducers: {
		// 设置
		setList(state, action: PayloadAction<BedListItem[]>) {
			BedListUtil.setBedList(action.payload)
			state.list = action.payload
		},
	},
})
export const actions = { ...slice.actions }
export default slice.reducer
