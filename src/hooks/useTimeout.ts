import { useEffect, useRef, useState } from "react"

export default function useTimeout(fn: Function, interval: number) {
	const timer = useRef(0)
	const callback = useRef(fn)
	const [reload, setReload] = useState(0)
	useEffect(() => {
		callback.current = fn
	}, [fn])
	useEffect(() => {
		const id = setTimeout(callback.current, interval)
		timer.current = id
		return () => clearTimeout(id)
	}, [interval, reload])

	// 需要返回什么吗?
	// 轮播图 在 hover 时 应当暂停播放
	// 所以应当提供该接口
	const clear = () => clearTimeout(timer?.current)
	const start = () => setReload((p) => p + 1)
	return [clear, start]
}
