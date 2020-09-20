import http from "."

export default {
	// Login: (data: Object) => http.post("/api/login", data),
	Login:(data?: Object) => http.get("/api/user", data),
	GetUserInfo: (params: Object) => http.get("/user", params),
	GetPostList: (params?: Object) => http.get("/api/posts", params),
}
