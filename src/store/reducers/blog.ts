import api from "@/http/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// 首页分类标签获取
const fetchTypeList = createAsyncThunk("types/GetTypeList", async () => {
	const res = await api.GetTypeList()
	return res.data
})
const slice = createSlice({
	name: "types",
	initialState: { loading: false, types: [] as any[] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTypeList.pending, (state, action) => {
				state.loading = true
			})
			.addCase(fetchTypeList.fulfilled, (state, action) => {
				state.loading = false
				state.types = action.payload
			})
			.addCase(fetchTypeList.rejected, (state, action) => {
				state.loading = false
			})
	},
})
export const actions = { ...slice.actions, fetchTypeList }
export default slice.reducer
