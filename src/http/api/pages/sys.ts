import http from "../.."
// 系统管理API
export default {
	getRoleList: (data: { pageNo: number; pageSize: number }) =>
		http.get("/api/user", data),
}
