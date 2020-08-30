import LocalStore from "@/utils/LocalStore"
import { TOKEN } from "@/configs/appConfig"

// action types
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SAVE_USER = "SAVE_USER"

// reducer

// 有token 视为已经登录
const initState = { user: null, login: !!LocalStore.get(TOKEN) }
const reducer = (state = initState, action: ActionProp<any>) => {
	const { type, payload } = action
	switch (type) {
		case SAVE_USER:
			console.log("SAVE_USER", { ...state, user: payload })
			return { ...state, user: payload }
		default:
			return state
	}
}

export default reducer
