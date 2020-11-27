import { IBuilderConfig, IBuilderLayout } from "@/@types/page-builder"
import h5Config from "@/configs/h5Config"
// 存储用于生成组件的信息
import {
	createSlice,
	nanoid,
	PayloadAction,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit"
import { AppState } from ".."

type TPageBuilder = {
	position: IBuilderLayout
	config: IBuilderConfig
	value: any
	type: string
	id: string
}

const builderListAdapter = createEntityAdapter<TPageBuilder>()

const slice = createSlice({
	name: "page-builder",
	initialState: {
		selectId: null as null | string,
		builderList: [] as TPageBuilder[],
	},
	reducers: {
		// 生成一个组件
		add(
			state,
			action: PayloadAction<
				Omit<Omit<TPageBuilder, "position">, "id"> & {
					layout: Object
				}
			>
		) {
			const id = nanoid(8)
			const { layout, ...rest } = action.payload
			state.builderList.push({
				id,
				...rest,
				position: {
					i: id,
					x: 0,
					y: Infinity,
					w: h5Config.COLS,
					h: h5Config.INIT_HEIGHT,
					...layout,
				}, // 位置信息
			})
		},
		update(state, action: PayloadAction<{ id: string; value: Object }>) {
			const { id, value } = action.payload
			state.builderList = state.builderList.map((item) => {
				if (item.id !== id) return item
				return { ...item, value }
			})
		},
		active(state, action: PayloadAction<null | string>) {
			state.selectId = action.payload
		},
		delete(state, action: PayloadAction<string | number>) {
			const id = action.payload
			return {
				selectId: null,
				builderList: state.builderList.filter((item) => item.id !== id),
			}
		},
	},
})
export const actions = slice.actions
export default slice.reducer

// 创建 selector
/**
 * 缓存 selector 可以避免不必要的渲染
 */
export const selectors = {
	selectConfig: () =>
		createSelector(
			[(state: AppState) => state.builder],
			(builder: AppState["builder"], ...args: any[]) => {
				const { builderList, selectId } = builder
				return builderList.find((item) => item.id === selectId)
			}
		),
}
