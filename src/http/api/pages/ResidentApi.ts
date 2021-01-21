import http from "@/http"

export interface AllotRoomData {
	memberId: string
	orgBedId: string
	orgRoomId: string
}
export interface ResidentAddData {
	id: string
	processMethod: string
	processRemark: string
}
export interface CaptchaData {
	mobile: string
}
export default {
	AllotBed: (data: AllotRoomData) => http.post("/orgmgt/member/Room", data), // 分配床位
	AddResident: (data: ResidentAddData) => http.post("/orgmgt/member/save",data),
}
