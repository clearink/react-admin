import { useCallback, useEffect, useRef } from "react"
import useMemoCallback from "../memo-callback"
import useMethods from "../methods/useMethods"

/**
 * 倒计时 hook
 * callback 回调函数
 * count 次数
 * interval 间隔,
 */
const initialState = {
	count: 0,
	active: false,
}
const reducers = {
	dec(state: any) {
		return { ...state, count: state.count - 1 }
	},
	// 开始计时
	start(state: any, count: number) {
		return { ...state, active: true, count }
	},
	stop(state: any) {
		return { ...initialState }
	},
	// 重置倒计时
	reset(state: any, count: number) {
		return { ...initialState, count }
	},
}
// 需求: 不是自动倒计时 或者 给一个变量自行控制是否自动倒计时
export default function useCountDown(count: number, interval: number = 1000) {
	const [state, methods] = useMethods(reducers, { ...initialState, count })

	const getCount = useMemoCallback(() => state.count, [])
	useEffect(() => {
		if (!state.active) return
		const timer = setInterval(() => {
			if (getCount() > 1) methods.dec()
			else {
				methods.stop()
				clearInterval(timer)
			}
		}, interval)
		return () => clearInterval(timer)
	}, [getCount, interval, methods, state.active])
	const start = useMemoCallback(() => methods.start(count), [])
	const reset = useMemoCallback(() => methods.reset(count), [])
	return [state, start, reset] as const
}
