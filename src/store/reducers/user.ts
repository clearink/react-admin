import { AppState } from "./../index"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import LoginUtil from "@/utils/store/LoginUtil"
import user from "@/http/api/user"

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
		const res = await user.Login(data)
		return res.data
	}
)
const getCurrentUser = createAsyncThunk("user/GetUserInfo", async () => {
	const res = await user.GetUserInfo()
	return res.data as user
})

// 获取设备token
const getDeviceToken = createAsyncThunk(
	"user/GetDeviceToken",
	async () => {
		const { data } = await user.GetDeviceToken()
		return data.result as string
	},
	{
		condition: (_, { getState }) => {
			const { user } = getState() as AppState
			return !user.deviceToken
		},
	}
)
const slice = createSlice({
	name: "user",
	initialState: {
		loginLoading: false,
		fetchLoading: false,
		user: null as user | null,
		deviceToken: null as null | string,
	},
	reducers: {
		logout(state) {
			state.user = null
			state.deviceToken = null
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

		// 设备token
		builder
			.addCase(getDeviceToken.pending, (state) => {
				state.fetchLoading = true
			})
			.addCase(getDeviceToken.fulfilled, (state, action) => {
				state.fetchLoading = false
				state.deviceToken = action.payload
			})
			.addCase(getDeviceToken.rejected, (state) => {
				state.fetchLoading = false
				state.deviceToken = null
			})
	},
})
export const actions = {
	...slice.actions,
	login,
	getCurrentUser,
	getDeviceToken,
}
export default slice.reducer
