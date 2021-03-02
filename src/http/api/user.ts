import http from ".."
export interface LoginData {
	mobile: string
	captcha: string
}
export interface CaptchaData {
	mobile: string
}
export default {
	Login: (data: LoginData) => http.post("/orgmgt/login", data), // 登录
	GetUserInfo: () => http.get<any>("/sys/currentUser"),

	// 验证码
	GetCaptcha: (params: CaptchaData) =>
		http.get("/orgmgt/sendCaptchaOrg", params),

	// 设备token
	GetDeviceToken: () => http.get("/orgmgt/device/bedToken"),
}
