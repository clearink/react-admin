import React, { useCallback,  useState } from "react"
import useInterval from "@/hooks/useInterval"
import { isFunction } from "@/utils/validate"

// 倒计时组件 默认 60s
interface CountDownProps {
	num: number
	children: (props: {
		reset: Function
		start: Function
		active: boolean
		count: number
	}) => JSX.Element
}
function CountDown(props: CountDownProps) {
	const { num, children } = props
	const [count, setCount] = useState(() => num)
	const [clear, startInterval, active] = useInterval(() => {
		setCount((p) => {
			if (p <= 1) clear()
			return p - 1
		})
	}, 1000)
	const reset = useCallback(() => {
		clear() // 停止计时
		setCount(num)
	}, [clear, num])

	const start = useCallback(() => {
		startInterval()
		setCount(num)
	}, [num, startInterval])
	if (isFunction(children)) return children({ reset, start, active, count })
	return null
}

export default CountDown
