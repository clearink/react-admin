import http from "../.."

export interface AddData {
	num: string | number
	orgBuildingId: string | number
}
export interface editData extends AddData {
	id: string | number
}

export interface RemoveData {
	ids: Array<string | number>
}

export interface ChangeData {
	enabled: boolean
	id: string
}
// 楼层管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/room/save", data),
	edit: (data: editData) => http.post("/orgmgt/room/save", data),
	remove: (data: RemoveData) => http.post("/orgmgt/room/delete", data),
	// 改变房间状态
	changeStatus: (data: ChangeData) => http.get("/orgmgt/room/change", data),
}
