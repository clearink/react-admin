import http from "../.."

export interface getIndexData {
	memberId: string | number
}
export interface getRecordList {
	memberId: string | number
	pageNo?: number
	pageSize?: number
}
export interface getToday {
	memberId: string | number
	today: Date
}

export default {
	getIndex: (data: getIndexData) =>
		http.get("/orgmgt/health/bloodGlucose/index", data),
	getRecordList: (data: getRecordList) =>
		http.get("/orgmgt/health/bloodGlucose/recordList", data),
	getToday: (data: getToday) =>
		http.get("/orgmgt/health/bloodGlucose/today", data),
}
