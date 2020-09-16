import http from "."

export default {
	Login: (data: Object) => http.post("/login", data),
	GetUserInfo: (params?: Object) => http.get("/user", params),
	GetList: (params?: Object) =>
		http.get(
			"https://easy-mock.com/mock/5dcf5ef7cf8d630c68faefa3/bike/list",
			params
		),
}
