import http from "..";

export interface AddData {
	parentId?: string | number
	name: string
}
export interface editData {
	id: string | number
	name: string
}

export interface RemoveData {
	id: string | number
}
// 楼层管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/building/save", data),
	edit: (data: editData) => http.post("/orgmgt/building/save", data),
	remove: (data: RemoveData) => http.get("/orgmgt/building/delete", data),
}
