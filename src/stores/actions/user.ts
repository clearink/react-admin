import api from "@/http/api"
import { DispatchProp } from "react-redux"
import { SAVE_USER } from "../actionTypes"
import LoginUtil from "@/utils/LoginUtil"
import actions from "."

// action

// 登录
export const LoginAction = (data: Object) => {
	return async () => {
		try {
			const { data: result } = (await api.Login(data)) as any
			console.log("LoginAction", result)

			// 存储 token
			LoginUtil.setToken(result.token)

			// 保存用户信息
			actions.SaveUser(result.user)
		} catch (error) {
			return Promise.reject(error)
		}
	}
}

// 登出
export const LogoutAction = () => {
	return (dispatch: DispatchProp) => {}
}

// 保存用户信息
export const SaveUser = (payload: Object) => {
	return {
		type: SAVE_USER,
		payload,
	}
}

// 获取用户信息
export const GetUserInfo = () => {
	return async () => {
		try {
			const { data } = await api.GetUserInfo()
			actions.SaveUser(data)
		} catch (error) {}
	}
}
