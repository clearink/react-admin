import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/http/api"
import LoginUtil from "@/utils/LoginUtil"

type user = {
	name: string
	id: string
	avatar: string
	password?: string
	[key: string]: any
}

const login = createAsyncThunk("user/login", async () => {
	const res = await api.Login()
	return res.data as user[]
})
const getCurrentUser = createAsyncThunk(
	"user/getCurrentUser",
	async (params: Object) => {
		const res = await api.Login(params)
		return res.data as user[]
	}
)

const slice = createSlice({
	name: "user",
	initialState: {
		loginLoading: false,
		fetchLoading: false,
		user: null as user | null,
	},
	reducers: {
		logout(state) {
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loginLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginLoading = false
				//存储到redux中
				state.user = action.payload[0]
				// 存储到storage
				LoginUtil.setToken(action.payload[0])
			})
			.addCase(login.rejected, (state) => {
				state.loginLoading = false
			})

		// 获取 当前用户信息
		builder
			.addCase(getCurrentUser.pending, (state) => {
				state.fetchLoading = true
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.fetchLoading = false

				state.user = action.payload[0]
				// 存储到storage
				LoginUtil.setToken(action.payload[0])
			})
			.addCase(getCurrentUser.rejected, (state) => {
				state.fetchLoading = false
			})
	},
})
export const actions = { ...slice.actions, login, getCurrentUser }
export default slice.reducer
