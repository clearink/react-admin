import {
	createSlice,
	createEntityAdapter,
	createSelector,
} from "@reduxjs/toolkit"
import { AppState } from ".."

interface ITest {
	id: number
	val: number
}
const testAdapter = createEntityAdapter<ITest>()

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
})
export const actions = { ...slice.actions }
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
