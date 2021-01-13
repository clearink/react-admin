// 数组去重
export default function unique<T>(array: any[], by?: string): T[] {
	if (!by) return Array.from(new Set(array))
	const map = new Map()
	for (let item of array) {
		map.set(item[by], item)
	}
	return Array.from<T>(map.values())
}
