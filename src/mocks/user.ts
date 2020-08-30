import Mock from "mockjs"
import { BASE_URL } from "@/configs/appConfig"

// 获取用户信息 mock
// 默认账号密码是 admin 123456
export const getUser = Mock.mock(`${BASE_URL}/user`, "get", function (
	options: any
) {
	console.log(" Mock.mock", options)
	return {
		success: false,
		code: 500,
		message: "未登录",
	}
})
