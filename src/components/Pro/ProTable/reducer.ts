import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ButtonProps } from "antd/lib/button"

export const initialState = {
	current: 1,
	pageSize: 10,
	loading: false as ButtonProps["loading"],
	selectedRows: [] as any[],
	data: [] as any[],
}

export const { reducer, actions } = createSlice({
	name: "proTable",
	initialState: initialState,
	reducers: {
		// 下一页
		nextCurrent(state) {
			state.current += 1
		},
		preCurrent(state) {
			state.current -= 1
		},

		// 改变 pageSize
		changePageSize(state, action: PayloadAction<number>) {
			state.pageSize = action.payload
		},
		// 改变 选中
		changeSelectedRows(state, action: PayloadAction<any[]>) {
			// 默认是使用id 如何能够让用户修改
			state.selectedRows = action.payload
		},
		// loading
		changeLoading(state, action: PayloadAction<ButtonProps["loading"]>) {
			state.loading = action.payload
		},
		// 重置
		reset() {
			return initialState
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