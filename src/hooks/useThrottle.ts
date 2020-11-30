import { useCallback, useEffect, useRef } from "react"

interface IRef {
	fn: Function
	timer: number | undefined
	first: boolean
}
// 函数节流
export default function useThrottle<T extends Function>(
	fn: T,
	delay: number = 17,
	immediate: boolean = false
) {
	const memoried = useRef<IRef>({
		fn,
		timer: undefined,
		first: true,
	})
	useEffect(() => {
		memoried.current.fn = fn
	}, [fn])
	return useCallback(
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
}
