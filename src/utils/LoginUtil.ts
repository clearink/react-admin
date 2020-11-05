import LocalStore from "./LocalStore"
import configs from "@/configs/app"

// 登录工具封装
class LoginUtil {
	// 获取 token
	static getToken() {
		return LocalStore.get(configs.TOKEN)
	}

	// 设置token以及过期时间 默认一天
	static setToken(val: any, time = 86400000) {
		LocalStore.set(configs.TOKEN, val)

		// expires time
		LocalStore.set(configs.TOKEN_EXPIRES, Date.now() + time)
	}

	// 清除 token
	static clearToken() {
		LocalStore.remove(configs.TOKEN)
		LocalStore.remove(configs.TOKEN_EXPIRES)
	}

	// 判断是否登录 同时还要判断token是否已经过期
	static isLogin() {
		const tokenExpires = LocalStore.get(configs.TOKEN_EXPIRES)
		if (!tokenExpires || tokenExpires < Date.now()) {
			// token已经过期,清除
			this.clearToken()
		}
		return !!LocalStore.get(configs.TOKEN)
	}
}

export default LoginUtil
