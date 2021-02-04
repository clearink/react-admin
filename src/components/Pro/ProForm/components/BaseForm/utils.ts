// 将Moment转换为字符串
import { isMoment } from "moment"
import { isArray, isObject } from "@/utils/data/validate"

// 去除 form 的 moment or EditState
export function formatFormValues(
	values: any,
	timeFormat: string = "YYYY-MM-DD"
): any {
	if (isArray(values)) {
		return values.map((item) => {
			if (isMoment(item)) return item.format(timeFormat)
			if (isObject(item) || isArray(item))
				return formatFormValues(item, timeFormat)
			return item
		})
	}
	if (isObject(values)) {
		return Object.entries(values).reduce((pre, [k, v]) => {
			if (isMoment(v)) return { ...pre, [k]: v.format(timeFormat) }
			if (isObject(v) || isArray(v))
				return { ...pre, [k]: formatFormValues(v, timeFormat) }
			return { ...pre, [k]: v }
		}, {})
	}
	return values
}
