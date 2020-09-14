import { createSlice } from "@reduxjs/toolkit"
import api from "@/http/api"
import { AppThunk } from ".."

const slice = createSlice({
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
})

export const {
	SAVE_USER,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
} = slice.actions

export default slice.reducer

// thunk actions

export const LOGIN = (user: any): AppThunk => {
	return async (dispatch) => {
		dispatch(LOGIN_REQUEST())
		try {
			// const result = api.Login(user)
			setTimeout(() => {
				dispatch(LOGIN_SUCCESS({ name: "24432", password: "1212" }))
			}, 2000)
			// dispatch success
		} catch (error) {
			// dispatch fail
			dispatch(LOGIN_FAIL())
		}
	}
}
