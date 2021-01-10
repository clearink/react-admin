export const initialState = {
	data: null as any,
	loading: false,
}
export default {
	setData(state: any, data: any) {
		return { ...state, data }
	},
	setLoading(state: any, loading: boolean) {
		return { ...state, loading }
	},
}
