// 全局 http 请求 loading 处理
// actionType
export const LOADING = "LOADING"
export const COMPLETE = "COMPLETE"

// reducer

const initState = { loading: false }

const reducer = (state = initState, action: ActionProp<typeof initState>) => {
	const { type } = action
	switch (type) {
		case LOADING:
			return { ...state, loading: true }
		case COMPLETE:
			return { ...state, loading: false }
		default:
			return state
	}
}

export default reducer
