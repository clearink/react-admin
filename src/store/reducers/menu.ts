import { TMenu } from "@/@types/menu"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
	name: "menu",
	initialState: [] as TMenu[],
	reducers: {
		saveMenu(state, action: PayloadAction<TMenu[]>) {
			return action.payload
		},
	},
})
export const actions = { ...slice.actions }
export default slice.reducer
