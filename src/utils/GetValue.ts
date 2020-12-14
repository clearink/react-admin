// 过滤掉某个对象的某些属性
// 可以传入一个函数
export default function GetValue<V extends Object>(
	obj: V,
	...keys: string[] | [(item: any, index: number, array: any[]) => any]
): V {
	if (keys.length === 1 && typeof keys[0] === "function") {
		return Object.entries(obj)
			.filter(keys[0])// 得到一个数组
			.reduce((pre, [k, v]) => {
				return { ...pre, [k]: v }
			}, {} as V) // 转成对象
	}
	const result = {} as V
	for (let [k, v] of Object.entries(obj)) {
		if ((keys as string[]).includes(k)) result[k] = v
	}
	return result
}