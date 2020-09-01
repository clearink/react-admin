export const CHANGE = "CHANGE"

const init = { menu: [] }
const reducers = (state = init, action: ActionProp<typeof init>) => {
	const { type, payload } = action
	switch (type) {
		case CHANGE:
			return { ...state, menu: payload }
		default:
			return state
	}
}
export default reducers
