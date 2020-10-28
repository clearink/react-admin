import http from "."

export default {
	// Login: (data: Object) => http.post("/api/login", data),
	Login: (data?: Object) => http.get("/api/user", data),
	GetUserInfo: (params: Object) => http.get<object>("/user", params),
	GetPostList: (params?: Object) => http.get<any[]>("/api/posts", params),
	GetTypeList: (params?: Object) => http.get<any[]>("/api/posts", params),
}
