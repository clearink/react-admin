// 过滤掉某个对象的某些属性
// 可以传入一个函数
export default function GetValue<T, K extends keyof T>(
	obj: T,
	keys: Array<K>
): Pick<T, K> {
	const result = {} as T
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i]
		result[key] = obj[key]
	}
	return result
}
