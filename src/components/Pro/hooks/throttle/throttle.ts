import { AnyFunc } from "../memo-callback"

export interface ThrottleOptions {
	delay: number
	immediate?: boolean
}
export default function debounce<C extends AnyFunc>(
	callback: C,
	options?: ThrottleOptions
) {
	const delay = options?.delay ?? 1000
	const immediate = options?.immediate

	let timer: number | undefined = undefined
	let canRun = false

	return function (this: unknown, ...args: any[]) {
		if (timer) return
		if (immediate) {
			if (canRun) callback.apply(this, args)
			canRun = true
		}
		timer = window.setTimeout(() => {
			timer = undefined

			if (immediate && canRun) {
				callback.apply(this, args)
				canRun = false
			}
			if (!immediate) callback.apply(this, args)
		}, delay)
	}
}
