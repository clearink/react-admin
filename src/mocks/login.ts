import Mock from "mockjs"
import { BASE_URL } from "@/configs/appConfig"

// 登录 mock
// 默认账号密码是 admin 123456
export default Mock.mock(`${BASE_URL}/login`, "post", function (options: any) {
	const { body } = options
	const userInfo = JSON.parse(body)
	if (userInfo.username === "admin" && userInfo.password === "123456") {
		return Mock.mock({
			success: true,
			code: 200,
			"token|20": "@string",
			user: {
				name: "@cname",
				birthday: '@date("yyyy-MM-dd")',
				city: "@city(true)",
				avatar: "@image('50x50','4A7BF7','哈哈')",
			},
		})
	}
	return {
		success: false,
		code: 500,
		message: "用户名或密码不正确",
	}
})
