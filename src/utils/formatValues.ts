import moment, { Moment } from "moment"
import { isArray, isObject } from "./validate"
// 金钱格式化
export const formatMoney = (
	money: string | number,
	separator: string = ","
) => {
	return `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const removeSeparator = (
	data: number | string,
	separator: string = ""
) => {
	return `${data}`.replace(new RegExp(`(${separator}*)`, "gi"), "")
}
// 对 onFinish 的一些字段的封装
/**
 * 需要处理的数据有
 * 1.Moment
 * 2.富文本
 */
// function findValueByPath(data: any, path: string[]) {
// 	let value = data
// 	while (value) {
// 		value = data[path.pop()]
// 	}
// }
export default function formatValues(
	values: object | any[],
	formatList: any[]
): any {
	const result = { ...values }
	for (let i = 0; i < formatList.length; i++) {
		const { type, path } = formatList[i]
		if (type === "date") {
			// 找 path
		}
	}
	// if (isArray(values)) {
	// 	return values.map((item) => {
	// 		if (isArray(item) || isObject(item)) return formatValues(item, path)
	// 		if (moment.isMoment(item)) return moment(item).format("YYYY-MM-DD")
	// 		// 是富文本
	// 		return item
	// 	})
	// }
	// if (isObject(values)) {
	// 	return Object.entries(values).reduce((pre, [k, v]) => {
	// 		if (isArray(v) || isArray(v))
	// 			return Object.assign(pre, { [k]: formatValues(v, path) })
	// 		if (v !== undefined && v !== "") return Object.assign(pre, { [k]: v })
	// 		return pre
	// 	}, {})
	// }
	return result
}
