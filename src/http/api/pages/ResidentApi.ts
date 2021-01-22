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
export interface FetchData {
	id: string | number
}
export default {
	AllotBed: (data: AllotRoomData) => http.post("/orgmgt/member/Room", data), // 分配床位
	AddResident: (data: ResidentAddData) =>
		http.post("/orgmgt/member/save", data), // 新增住户
	FetchDetail: async (data: FetchData) => {
		const response = await http.get("/orgmgt/member/queryById", data)
		return response.data.result
	},
}
