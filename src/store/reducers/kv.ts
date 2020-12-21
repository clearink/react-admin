// 存储一些常用的 k,v字段, 避免重复添加
import {
	createSlice,
	createEntityAdapter,
	PayloadAction,
} from "@reduxjs/toolkit"
type kvType = {
	key: string
	value: any
}
const kvAdapter = createEntityAdapter<kvType>({
	selectId:(kv)=>kv.key
})
const slice = createSlice({
	name: "kv",
	initialState: kvAdapter.getInitialState(),
	reducers: {
		// 保存数据
		add: kvAdapter.addOne,
		update(state, action: PayloadAction<kvType>) {
			kvAdapter.updateOne(state, {
				changes: action.payload,
				id: action.payload.key,
			})
		},
		delete(state, action: PayloadAction<string>) {
			kvAdapter.removeOne(state, action.payload)
		},
	},
})
export const actions = slice.actions
export default slice.reducer
