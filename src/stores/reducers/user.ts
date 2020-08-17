import { DispatchProp } from "react-redux"

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT = "LOGOUT"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"

export const LoginAction = (data: ActionProp<CounterState>) => {
	return (dispatch: DispatchProp) => {
    // dispatch()
  }
}

export const LogoutAction = () => {
	return (dispatch: DispatchProp) => {}
}
