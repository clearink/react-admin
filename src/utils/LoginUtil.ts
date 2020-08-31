import LocalStore from "./LocalStore"
import { TOKEN, TOKEN_EXPIRES } from "@/configs/appConfig"

// 登录工具封装
class LoginUtil {
	// 获取 token
	static getToken() {
		return LocalStore.get(TOKEN)
	}

	// 设置token以及过期时间
	static setToken(val: string) {
		LocalStore.set(TOKEN, val)

		// expires time
		LocalStore.set(TOKEN_EXPIRES, Date.now() + 86400)
	}

	// 清除 token
	static clearToken() {
		LocalStore.remove(TOKEN)
		LocalStore.remove(TOKEN_EXPIRES)
	}

	// 判断是否登录
	static isLogin() {
		return !!LocalStore.get(TOKEN)
	}

	// 保存用户信息至redux
	static saveUser() {}
}

export default LoginUtil
