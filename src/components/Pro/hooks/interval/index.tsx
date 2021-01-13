import { isNullUndefined } from "@/utils/data/validate"
import { useEffect, useRef } from "react"
import useMemoCallback from "../memo-callback"

/**
 * 倒计时 hook
 * callback 回调函数
 * interval 间隔,
 */
// 需求: 不是自动倒计时 或者 给一个变量自行控制是否自动倒计时
export interface UseIntervalOptions {
	immediate?: boolean
	interval: number
}
export default function useInterval(
	callback: () => void,
	options?: UseIntervalOptions
) {
	const immediate = options?.immediate
	const interval = options?.interval ?? 1000
	const timer = useRef<number | undefined>(undefined) // 计时器 timer
	const fn = useMemoCallback(callback, [])
	useEffect(() => {
		if (isNullUndefined(interval)) return
		if (immediate) fn()
		timer.current = window.setInterval(fn, interval)
		return () => clearInterval(timer.current)
	}, [fn, interval, immediate])
}
