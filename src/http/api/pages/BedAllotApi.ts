import http from "../.."

export interface AddData {
	parentId?: string | number
	name: string
}
export interface editData {
	id: string | number
	name: string
}

export interface RemoveData {
	ids: Array<string | number>
}
// 楼层管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/bed/save", data),
	edit: (data: editData) => http.post("/orgmgt/bed/save", data),
	// 楼层删除
	removeFloor: (data: { id: string }) => http.get("/orgmgt/building/delete", data),
	// 床位删除
	removeBed: (data: RemoveData) => http.post("/orgmgt/bed/delete", data),
}
