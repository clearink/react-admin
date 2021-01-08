import http from "../.."

export interface AddData {
	num: string | number
	orgBuildingId: string | number
}
export interface editData extends AddData {
	id: string | number
}

export interface RemoveData {
	id: string | number
}
// 楼层管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/room/save", data),
	edit: (data: editData) => http.post("/orgmgt/room/save", data),
	remove: (data: RemoveData) => http.get("/orgmgt/room/delete", data),
}
