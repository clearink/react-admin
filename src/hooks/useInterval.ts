import { useEffect, useRef, useState } from "react"

export default function useInterval(
	fn: Function,
	interval: number
): [Function, Function, boolean] {
	const timer = useRef(0)
	const callback = useRef(fn)
	const [reload, setReload] = useState(0)
	const [active, setActive] = useState(false) // 是否在 倒计时
	useEffect(() => {
		if (!active) return
		const id = setInterval(callback.current, interval)
		setActive(true)
		timer.current = id
		return () => clearInterval(id)
	}, [interval, reload, active])

	// 需要返回什么吗?
	// 轮播图 在 hover 时 应当暂停播放
	// 所以应当提供该接口
	const clear = () => {
		clearInterval(timer?.current)
		setActive(false)
	}
	const start = () => {
		setReload((p) => p + 1)
		setActive(true)
	}
	return [clear, start, active]
}
