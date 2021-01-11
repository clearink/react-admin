import { ProFormMap } from "@/components/BigSight"
import React from "react"
import { ProFormInput } from "../ProForm"
import { ProFieldType } from "../ProTable/type"

function renderQueryFilter(QFArray: Array<[ProFieldType | undefined, object]>) {
	return QFArray.map(([type, props]) => {
		const QueryComponent = ProFormMap[type ?? "text"] ?? ProFormInput
		return <QueryComponent {...props} />
	})
}
export default renderQueryFilter

/*
| "checkbox"
| "code"
| "date"
| "time"
| "dateRange"
| "dateTime"
| "dateTimeRange"
| "fromNow"
| "password"
| "percent"
| "radio"
| "select"
| "avatar"
| "digit" //数字
| "json"
| "money"
| "progress"
| "rate"
| "text"
| "orderNum"
*/
