// actionType
export const INCREASE = "INCREASE"
export const DECREASE = "DECREASE"

// action
export const counterIncAction = () => {
	return {
		type: INCREASE,
	}
}

// reducer

const initState = { count: 0 }

const reducer = (state = initState, action: ActionProp<number>) => {
	const { type, payload } = action
	switch (type) {
		case INCREASE:
			return { ...state, count: state.count + 1 }
		case DECREASE:
			return { ...state, count: state.count - 1 }
		default:
			return state
	}
}

export default reducer
