import http from "@/http"

export interface FetchData {
	memberId: string | undefined
}

export interface ToDayData {
	memberId: string
	today: string | number | undefined
}
export interface HistoryData {
	memberId: string
	pageNo: number
	pageSize: number
}
export interface PressureData {
	bloodOxygenId: string
}
export default {
	HomeData: (params: FetchData) =>
		http.get("/orgmgt/health/bloodOxygen/index", params), // 首页数据
	HistoryList: (params: HistoryData) =>
		http.get("/orgmgt/health/bloodOxygen/recordList", params),
	PressureData: (params: PressureData) =>
		http.get("/orgmgt/health/bloodOxygen/queryById", params),
	TodayData: (params: ToDayData) =>
		http.get("/orgmgt/health/bloodOxygen/today", params),
}
