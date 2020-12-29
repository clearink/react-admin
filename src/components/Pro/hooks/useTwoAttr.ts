import { isArray } from "./../../../utils/validate"
import { useMemo } from "react"
/**
 * Field 的有些属性会冲突
 * 该hook会计算出readAttr与editAttr
 */

export default function useTwoAttr<T, V>(attr: [T, V] | T) {
	return useMemo<[T, V] | [T]>(() => {
		if (isArray(attr)) return attr // 是 数组 直接返回
		return [attr] // 两个一样
	}, [attr])
}
