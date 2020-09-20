import api from "@/http/api"
import {
	createAsyncThunk,
	createSlice,
	createEntityAdapter,
} from "@reduxjs/toolkit"

type list = { id: number; title: string; content: string }

const listAdapter = createEntityAdapter<list>()

// thunk action
const fetchList = createAsyncThunk("list/GetList", async () => {
	const response = await api.GetPostList()
	return response.data
})

const slice = createSlice({
	name: "list",
	initialState: listAdapter.getInitialState({
		loading: false,
	}),
	reducers: {},
	// 异步请求处理逻辑
	extraReducers: (builder) => {
		builder
			.addCase(fetchList.pending, (state, action) => {
				state.loading = true
			})
			.addCase(fetchList.fulfilled, (state, action) => {
				state.loading = false
				listAdapter.upsertMany(state, action.payload)
			})
			.addCase(fetchList.rejected, (state, action) => {
				state.loading = false
			})
	},
})
export const actions = { ...slice.actions, fetchList }
export default slice.reducer
