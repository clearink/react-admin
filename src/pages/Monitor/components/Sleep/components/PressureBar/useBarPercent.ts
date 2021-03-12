import { useMemo } from "react"
import { SeparatorItem } from "."

type Callback<A> = (item: A, index: number, arr: A[]) => boolean

// 返回当前 index 与匹配的项
function FindValueIndex<A = any>(num: number, arr: A[]) {
	for (let i = 0; i < arr.length - 1; i++) {
		const element = (arr[i] as unknown) as SeparatorItem
		const nextElement = (arr[i + 1] as unknown) as SeparatorItem
		if (element.value <= num && nextElement.value >= num) {
			return [i, arr[i]] as const
		}
	}
	return [-1, arr[arr.length - 1]] as const
}

function FindGrow(separator: SeparatorItem[], index: number) {
	const result = [0, 0]
	for (let i = 0; i < separator.length; i++) {
		const element = separator[i]
		const grow = element?.grow ?? 1
		if (i < index) result[0] += grow
		result[1] += grow
	}
	return result
}

// 限制在某个范围
export function valueRange(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

/* 
  基本思路
1. 找出该段之前的占比
2. 获得相对于本段的占比 
3. 本段占比乘以该段的总的占比
4. 相加
*/
export default function useBarPercent(
	value: number,
	separator: SeparatorItem[]
) {
	const number = useMemo(() => Math.max(0, value), [value])
	return useMemo(() => {
		const [matchIndex, matchItem] = FindValueIndex(number, separator)
		const grow = matchItem.grow ?? 1
		if (matchIndex !== -1) {
			const [current, total] = FindGrow(separator, matchIndex)
			const next = separator[matchIndex + 1]
			const relative =
				(number - matchItem.value) / (next.value - matchItem.value)
			const percent = (relative * grow + current) / total
			return [matchItem.color, valueRange(percent * 100, 0, 100).toFixed(2)]
		} else {
			const [current, total] = FindGrow(separator, separator.length - 1)
			const relative = (number - matchItem.value) / (1000 - matchItem.value)
			const percent = (relative * grow + current) / total
			return [
				separator[separator.length - 1].color,
				valueRange(percent * 100, 0, 100).toFixed(2),
			]
		}
	}, [number, separator])
}
