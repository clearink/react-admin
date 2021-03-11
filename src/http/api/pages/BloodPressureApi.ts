import http from "@/http"

export interface FetchData {
	memberId: string | undefined
}

export interface ToDayData {
	memberId: string
	today: string
}
export interface HistoryData {
	memberId: string
	pageNo: number
	pageSize: number
}
export interface PressureData {
	bloodPressureId: string
}
export default {
	HomeData: (params: FetchData) =>
		http.get("/orgmgt/health/bloodPressure/index", params), // 首页数据
	HistoryList: (params: HistoryData) =>
		http.get("/orgmgt/health/bloodPressure/recordList", params),
	PressureData: (params: PressureData) =>
		http.get("/orgmgt/health/bloodPressure/queryById", params),
	TodayData: (params: ToDayData) =>
		http.get("/orgmgt/health/bloodPressure/today", params),
}
