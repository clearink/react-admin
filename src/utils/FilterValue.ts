// 过滤掉某个对象的某些属性
export default function FilterValue(obj: Object, ...keys: string[]) {
	const result = {}
	for (let [k, v] of Object.entries(obj)) {
		if (keys.includes(k)) continue
		result[k] = v
	}
	return result
}
