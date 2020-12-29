// 过滤掉某个对象的某些属性
// 可以传入一个函数
export default function FilterValue<T, K extends keyof T>(
	obj: T,
	keys: Array<K>
): Omit<T, K> {
	const result = Object.assign({}, obj)
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i]
		delete result[key]
	}
	return result
}
