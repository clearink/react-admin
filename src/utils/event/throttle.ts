import { isNull } from "./../data/validate"
// 节流函数-简易版本
export default function throttle(
	fn: (...args: any[]) => any,
	delay: number = 100
) {
	let timer: number | null = null
	return function (this: unknown, ...args: any[]) {
		if (!isNull(timer)) return
		timer = window.setTimeout(() => {
			fn.apply(this, args)
			timer = null
		}, delay)
	}
}
