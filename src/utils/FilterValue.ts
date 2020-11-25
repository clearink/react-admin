// 过滤掉某个对象的某些属性
export default function FilterValue<V extends Object>(
	obj: V,
	...keys: string[]
): V {
	const result = {} as V
	for (let [k, v] of Object.entries(obj)) {
		if (keys.includes(k)) continue
		result[k] = v
	}
	return result
}
