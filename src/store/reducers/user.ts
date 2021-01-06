import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/http/api"
import LoginUtil from "@/utils/LoginUtil"

type user = {
	name: string
	id: string
	avatar: string
	password?: string
	sysDepart: {
		departName: string
		logo: string
		[key: string]: any
	}
	[key: string]: any
}

const login = createAsyncThunk<user, Object>(
	"user/login",
	async (data: any) => {
		const res = await api.Login(data)
		return res.data
	}
)
const getCurrentUser = createAsyncThunk("user/GetUserInfo", async () => {
	const res = await api.GetUserInfo()
	return res.data as user
})

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
				const { result } = action.payload
				//存储到redux中
				state.user = result.userInfo
				// 存储到storage
				LoginUtil.setToken(result.token)
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
				const { result } = action.payload
				//存储到redux中
				state.user = result
			})
			.addCase(getCurrentUser.rejected, (state) => {
				state.fetchLoading = false
			})
	},
})
export const actions = { ...slice.actions, login, getCurrentUser }
export default slice.reducer
