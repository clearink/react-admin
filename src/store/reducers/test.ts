import { AppState } from "./../index"
import { sleep } from "./../../utils/test"
import {
	createSlice,
	createEntityAdapter,
	createSelector,
	createAsyncThunk,
	PayloadAction,
} from "@reduxjs/toolkit"

interface ITest {
	id: number
	val: number
}
const testAdapter = createEntityAdapter<ITest>()

const testApi = createAsyncThunk(
	"test/test",
	async (id: string, { rejectWithValue }) => {
		await sleep(200)
		const isSuccess = Math.random() > 0.5
		if (isSuccess) return Promise.resolve(`isSuccess: ${isSuccess}`)
		// rejectWithValue 返回 Promise.reject(value) 但是精简了一些数据
		return rejectWithValue(`isSuccess: ${isSuccess}`)
	}
	// {
	// 	condition: (id, { getState }) => {
	// 		const { user } = getState() as AppState
	// 		return !user.deviceToken
	// 	},
	// }
)

const slice = createSlice({
	name: "test",
	initialState: testAdapter.getInitialState(),
	reducers: {
		fetchData(state) {
			testAdapter.upsertMany(
				state,
				Array.from(Array(100), (_, i) => ({
					id: i,
					val: Math.random(),
				}))
			)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(testApi.pending, (state, action: PayloadAction) => {})
	},
})
export const actions = { ...slice.actions, testApi }
export default slice.reducer

// 创建 selector
/**
 * 缓存 selector 可以避免不必要的渲染
 */
export const selectors = {
	selectById: () =>
		createSelector(
			[(state: AppState) => state.test, (_: any, id: number) => id],
			(test: AppState["test"], id) => {
				console.time("expensive test")
				for (let i = 0; i < 50000000; i++) {
					Math.random()
				}
				console.timeEnd("expensive test")
				console.log("selectors selectById", test, id)
				return test.entities[id]
			}
		),
}
