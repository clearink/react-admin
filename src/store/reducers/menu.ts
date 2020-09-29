import { TMenu } from "@/@types/menu"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
	name: "menu",
	initialState: { menu: [] as TMenu[], collapsed: false },
	reducers: {
		saveMenu(state, action: PayloadAction<TMenu[]>) {
			state.menu = action.payload
		},
		toggleMenu(state) {
			state.collapsed = !state.collapsed
		},
	},
})
export const actions = { ...slice.actions }
export default slice.reducer
