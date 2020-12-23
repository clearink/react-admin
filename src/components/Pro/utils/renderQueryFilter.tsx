import React, { ComponentType } from "react"
import {
	ProFormDate,
	ProFormDight,
	ProFormSelect,
	ProFormText,
} from "../ProForm/components"
import { ProFieldType } from "../ProTable/type"

export const formItemMap: { [key: string]: ComponentType<any> } = {
	text: ProFormText,
	orderNum: ProFormText,
	select: ProFormSelect,
	digit: ProFormDight,
	date: ProFormDate,
}

function renderQueryFilter(QFArray: Array<[ProFieldType, object]>) {
	return QFArray.map(([type, props]) => {
		const QueryComponent = formItemMap[type] ?? ProFormText
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
