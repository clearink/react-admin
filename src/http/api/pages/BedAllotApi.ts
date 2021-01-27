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

export interface AddFloorData {
	name: string
	parentId: string
}

export interface EditFloorData extends AddFloorData {
	id: string
}
// 楼层管理 API
export default {
	add: (data: AddData) => http.post("/orgmgt/bed/save", data),
	edit: (data: editData) => http.post("/orgmgt/bed/save", data),
	// 床位删除
	removeBed: (data: RemoveData) => http.post("/orgmgt/bed/delete", data),

	// 新增楼层
	addFloor: (data: AddFloorData) => http.post("/orgmgt/building/save", data),
	// 编辑楼层
	editFloor: (data: EditFloorData) => http.post("/orgmgt/building/save", data),
	// 楼层删除
	removeFloor: (data: { id: string }) =>
		http.get("/orgmgt/building/delete", data),
}
