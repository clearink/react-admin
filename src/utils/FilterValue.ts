// 过滤掉某个对象的某些属性
export default function FilterValue(obj: Object, ...keys: string[]) {
	return Object.entries(obj).reduce((pre, [k, v]) => {
		if (keys.includes(k)) return pre
		return { ...pre, [k]: v }
	}, {})
}
