import { IBuilderConfig, IBuilderLayout } from "@/@types/page-builder"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type TPageBuilder = {
	position: IBuilderLayout
	config: IBuilderConfig
	value: any
	type: string
	id: string
}
const slice = createSlice({
	name: "page-builder",
	initialState: {
		selectId: null as null | string,
		builderList: [] as TPageBuilder[],
	},
	reducers: {
		add(state, action: PayloadAction<TPageBuilder>) {
			state.builderList.push(action.payload)
		},
		update(state, action: PayloadAction<TPageBuilder[]>) {},
		active(state, action: PayloadAction<null | string>) {
			state.selectId = action.payload
		},
	},
})
export const actions = slice.actions
export default slice.reducer
