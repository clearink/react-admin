import { isMoment } from "moment"
import { isArray, isObject } from "../data/validate"

// 去除 form 的 moment or EditState
export default function formatValue(
	values: any,
	timeFormat: string = "YYYY-MM-DD"
): any {
	if (isArray(values)) {
		return values.map((item) => {
			if (isMoment(item)) return item.format(timeFormat)
			if (isObject(item) || isArray(item)) return formatValue(item, timeFormat)
			return item
		})
	}
	if (isObject(values)) {
		return Object.entries(values).reduce((pre, [k, v]) => {
			if (isMoment(v)) return { ...pre, [k]: v.format(timeFormat) }
			if (isObject(v) || isArray(v))
				return { ...pre, [k]: formatValue(v, timeFormat) }
			return { ...pre, [k]: v }
		}, {})
	}
	return values
}
