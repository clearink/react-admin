import { isArray, isObject } from "./validate"
// 清除 数组 或者 对象中 的 值为 undefined '' 属性
export default function removeEmpty<T = any[] | object>(data: T): T {
	if (isArray(data)) {
		return data.filter((item) => {
			if (isArray(item) || isObject(item)) return removeEmpty(item)
			return item !== undefined && item !== ""
		}) as any
	}
	if (isObject(data)) {
		return Object.entries(data).reduce((pre, [k, v]) => {
			if (isArray(v) || isArray(v))
				return Object.assign(pre, { [k]: removeEmpty(v) })
			if (v !== undefined && v !== "") return Object.assign(pre, { [k]: v })
			return pre
		}, {}) as any
	}
	return data
}
