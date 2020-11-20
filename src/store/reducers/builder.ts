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
	initialState: [] as TPageBuilder[],
	reducers: {
		add(state, action: PayloadAction<TPageBuilder>) {
			state.push(action.payload)
		},
		update(state, action: PayloadAction<TPageBuilder[]>) {
			return action.payload
		},
	},
})
export const actions = slice.actions
export default slice.reducer
