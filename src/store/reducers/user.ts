import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import api from "@/http/api"

export const login = createAsyncThunk(
	"user/login",
	async (user: Object, thunkApi) => {
		const res = await api.Login(user)
		return res.data
	}
)

const init: {
	user: Object
	loading: boolean
} = { user: {}, loading: false }

const { actions, reducer } = createSlice({
	name: "user",
	initialState: init,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				// state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
			})
	},
})
export const {} = actions
export default reducer
