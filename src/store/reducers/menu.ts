import { TMenu } from "@/@types/menu"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import https from "@/http/layout"
const fetchMenu = createAsyncThunk("menu/fetch", async () => {
	const response = await https.GetMenu()
	return response.data
})

const slice = createSlice({
	name: "menu",
	initialState: { menu: [] as TMenu[], collapsed: false, loading: false },
	reducers: {
		saveMenu(state, action: PayloadAction<TMenu[]>) {
			state.menu = action.payload
		},
		toggle(state) {
			state.collapsed = !state.collapsed
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMenu.pending, (state, action) => {
				state.loading = true
			})
			.addCase(fetchMenu.fulfilled, (state, action) => {
				state.loading = false
				// state.menu = action.payload
			})
			.addCase(fetchMenu.rejected, (state, action) => {
				state.loading = false
			})
	},
})
export const actions = { ...slice.actions, fetchMenu }
export default slice.reducer
