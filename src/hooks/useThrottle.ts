import { useCallback, useRef } from "react"

interface IRef {
	fn: Function
	timer: number | undefined
	first: boolean
}
// 函数节流
export default function useThrottle<T extends Function>(
	fn: T,
	delay: number,
	immediate: boolean = true
) {
	const memoried = useRef<IRef>({
		fn,
		timer: undefined,
		first: true,
	})
	const throttleFn = useCallback(
		function (this: void, ...args) {
			const { current } = memoried
			if (immediate && current.first) {
				current.first = false
				current.fn.apply(this, args)
			} else if (current.timer === undefined) {
				// 设置定时器
				current.timer = window.setTimeout(() => {
					current.timer = undefined
					current.fn.apply(this, args)
				}, delay)
			}
		},
		[delay, immediate]
	)
	return throttleFn
}
