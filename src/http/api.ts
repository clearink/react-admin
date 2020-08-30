import http from "."

export default {
	Login: (data: Object) => http.post("/login", data),
	GetUserInfo: (params?: Object) => http.get("/user", params),
}
