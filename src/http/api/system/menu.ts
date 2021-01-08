import http from "../.."

export default {
	GetMenu: () => http.get<any[]>("/sys/permission/queryMenu"),
}
