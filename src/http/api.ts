import http from "."

export default {
	// Login: (data: Object) => http.post("/api/login", data),
	Login: (data: Object) => http.post("/sys/login", data),
	GetUserInfo: () => http.get<any>("/sys/currentUser"),
	GetPostList: (params?: Object) => http.get<any[]>("/api/posts", params),
	GetTypeList: (params?: Object) => http.get<any[]>("/api/posts", params),
}
