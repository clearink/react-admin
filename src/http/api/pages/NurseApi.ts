import http from "../.."

export interface AddData {
	name: string
	age: number
	[key: string]: any
}
export interface editData extends AddData {
	id: string | number
}

export interface FindData {
	name?: string
	position?: string
}
export interface RemoveData {
	ids: string[]
}
export interface ApplyData {
	memberId: string
	orgCareWorkerId: string
}
// 护管管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/careWorker/save", data),
	edit: (data: editData) => http.post("/orgmgt/careWorker/save", data),
	remove: (data: RemoveData) => http.post("/orgmgt/careWorker/delete", data),
	// 护管查找
	find: (data: FindData) => http.get("/orgmgt/careWorker/queryByName", data),
	// 护管分配
	apply: (data: ApplyData) => http.post("/orgmgt/member/careWorker", data),
}
