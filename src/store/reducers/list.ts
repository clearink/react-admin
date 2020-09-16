import api from "@/http/api"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface listState {
	id: number
	title: string
	text: string
}
// thunk action
export const fetchList = createAsyncThunk(
	"list/GetList",
	async (_: void, { signal }) => {
		const response = await api.GetList({ signal })
		return response.data.data.list
	}
)
type TypeInit = {
	list: listState[]
	loading: boolean
}
const init: TypeInit = { list: [], loading: false }

const { actions, reducer } = createSlice({
	name: "list",
	initialState: init,
	reducers: {},
	// 异步请求处理逻辑
	extraReducers: (builder) => {
		builder
			.addCase(fetchList.pending, (state, action) => {
				state.loading = true
			})
			.addCase(
				fetchList.fulfilled,
				(state, action: PayloadAction<listState[]>) => {
					state.loading = false
					state.list = action.payload
				}
			)
			.addCase(fetchList.rejected, (state, action) => {
				state.loading = false
			})
	},
})
export default reducer
