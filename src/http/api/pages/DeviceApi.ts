import http from "@/http"

export interface AddData {
	type: string
	num: string
	modelNum: string
}
export interface EditData extends AddData {
	id: string
}
export interface DeleteData {
	ids: string[]
}
export interface BedConnectData {
	deviceId: string
	orgBedId: string
}

export default {
	DeviceAdd: (data: AddData) => http.post("/orgmgt/device/save", data), // 告警处理
	DeviceDelete: (params: DeleteData) =>
		http.get("/orgmgt/device/delete", params),
	DeviceEdit: (params: EditData) => http.post("/orgmgt/device/save", params),
	// 床位关联
	BedConnect: (data: BedConnectData) =>
		http.post("/orgmgt/device/bed/Allocation", data),
	// 查询关联的用户
	GetConnectedUser: (params: { id: string }) =>
		http.get("/orgmgt/device/member/queryByDeviceID"),
}
