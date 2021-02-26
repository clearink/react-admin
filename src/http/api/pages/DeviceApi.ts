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

export interface ConnectUserData {
	deviceId: string
	memberId: string
}

export interface InputFingerData {
	memberId: string
	deviceId: string
}
export interface FingerDataInfo {
	memberId: string
}
export default {
	DeviceAdd: (data: AddData) => http.post("/orgmgt/device/save", data), // 告警处理
	DeviceDelete: (params: DeleteData) =>
		http.post("/orgmgt/device/delete", params),
	DeviceEdit: (params: EditData) => http.post("/orgmgt/device/save", params),
	// 床位关联
	BedConnect: (data: BedConnectData) =>
		http.post("/orgmgt/device/bed/Allocation", data),
	// 查询关联的用户
	GetUserList: (params: { id: string }) =>
		http.get("/orgmgt/device/member/queryByDeviceID", params),
	ConnectUser: (data: ConnectUserData) =>
		http.post("/orgmgt/device/member/Allocation", data),
	// 开始录入指纹
	InputFinger: (data: InputFingerData) =>
		http.post("/orgmgt/device/member/fingerprint", data),
	// 查询录入指纹信息
	GetFingerInfo: (params: FingerDataInfo) =>
		http.get("/orgmgt/device/member/fingerprint", params),
	// 用户解绑
	UnConnectUser: (data: InputFingerData) =>
		http.post("/orgmgt/device/member/unAllocation", data),
	// 更新指纹信息
	UpdateFingerInfo: (data: InputFingerData) =>
		http.post("/orgmgt/device/member/saveFingerprint", data),
	// 监控分析接口

	// 请求床位信息
	GetMonitorList: (data: {
		roomId: string
		status?: string
		pageSize: number
		pageNo: number
	}) => http.post("/orgmgt/bed/monitor", data),
}
