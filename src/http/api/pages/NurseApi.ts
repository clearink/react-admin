import http from "../.."

export interface AddData {
	name: string
	age: number
	[key: string]: any
}
export interface editData extends AddData {
	id: string | number
}

export interface RemoveData {
	ids: string[]
}
// 护管管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/careWorker/save", data),
	edit: (data: editData) => http.post("/orgmgt/careWorker/save", data),
	remove: (data: RemoveData) => http.post("/orgmgt/careWorker/delete", data),
}
