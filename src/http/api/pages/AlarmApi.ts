import http from "@/http"

export interface FetchData {
	id: string | undefined
}
export interface CheckData {
	id: string
	processMethod: string
	processRemark: string
}
export interface CaptchaData {
	mobile: string
}
export default {
	CheckAlarm: (data: CheckData) =>
		http.post("/orgmgt/alarm/changeStatus", data), // 告警处理
	FetchDetail: (params: FetchData) =>
		http.get("/orgmgt/alarm/queryById", params),
}
