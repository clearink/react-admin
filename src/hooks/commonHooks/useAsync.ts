import { useReducer } from "react"
import { createSlice } from "@reduxjs/toolkit"
import useEventCallback from "../useEventCallback"

const slice = createSlice({
	name: "number",
	initialState: 0,
	reducers: {
		increment(state) {
			return state + 1
		},
		decrement(state) {
			return state - 1
		},
	},
})
export default function useAsync<T extends (...args: any[]) => any>(
	fn: T
): [boolean, T] {
	const [count, dispatch] = useReducer(slice.reducer, 0)
	const boundFunc = useEventCallback(async (...args: any[]) => {
		dispatch(slice.actions.increment())
		const result = await fn(...args)
		dispatch(slice.actions.decrement())
		return result
	}, [])
	return [count > 0, boundFunc as T]
}
