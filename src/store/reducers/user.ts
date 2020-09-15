import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import api from "@/http/api"
import { AppThunk } from ".."
import { stat } from "fs"

export const LOGIN = createAsyncThunk(
	"user/LOGIN",
	async (user: Object, thunkApi) => {
		const res = await api.Login(user)
		return res
	}
)

const { actions, reducer } = createSlice({
	name: "user",
	initialState: { user: null, isFetching: false },
	reducers: {
		LOGIN_REQUEST(state) {
			state.isFetching = true
		},
		LOGIN_SUCCESS(state, action) {
			state.isFetching = false
			state.user = action.payload
		},
		LOGIN_FAIL(state) {
			state.isFetching = false
		},
		SAVE_USER(state, action) {
			state.user = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(LOGIN.fulfilled, (state, action) => {
				// success
				state.isFetching = false
				state.user = action.payload as any
			})
			.addCase(LOGIN.rejected, (state) => {
				// fail
				state.isFetching = false
			})
	},
})

export const { SAVE_USER, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } = actions

export default reducer
