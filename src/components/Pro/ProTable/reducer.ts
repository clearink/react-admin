import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ButtonProps } from "antd/lib/button"

export const initialState = {
	current: 1,
	pageSize: 10,
	data: [] as any[],
	total: 0,
	loading: false as ButtonProps["loading"],
	selectedRows: [] as any[],
	params: {}, // querySearch表单值
}

export const { reducer, actions } = createSlice({
	name: "proTable",
	initialState: initialState,
	reducers: {
		// 改变 选中
		changeSelectedRows(state, action: PayloadAction<any[]>) {
			// 默认是使用id 如何能够让用户修改
			state.selectedRows = action.payload
		},
		// loading
		changeLoading(state, action: PayloadAction<ButtonProps["loading"]>) {
			state.loading = action.payload
		},
		// 改变 data
		changeData(state, action: PayloadAction<any[]>) {
			state.data = action.payload
		},
		// 改变 current
		changeCurrent(state, action: PayloadAction<number>) {
			state.current = action.payload
		}, // 改变 pageSize
		changePageSize(state, action: PayloadAction<number>) {
			state.pageSize = action.payload
		},
		changeTotal(state, action: PayloadAction<number>) {
			state.total = action.payload
		},
		changeParams(state, action: PayloadAction<object>) {
			state.params = action.payload
		},
		// 重置
		reset(state) {
			// hack: params 修改指向 fetchData 重新请求数据
			// hack: 保留 data ,个人习惯
			state.params = {}
			state.current = 1
		},
	},
})

/**
	* table 自己维护的字段有
		1. 分页相关
		current 
		pageSize

		2. loading 相关

		table 的loading 可以传到 query filter 中

		3. 选择项相关
		
		4. data
			远程请求的数据
    // current 与 value  按照页码存储

	*/
