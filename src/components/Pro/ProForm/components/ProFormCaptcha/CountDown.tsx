import useInterval from "@/hooks/useInterval"
import React, { useEffect, useState } from "react"

// 倒计时组件 默认 60s
interface CountDownProps {
	num: number
	children: (props: {
		clear: Function
		start: Function
		active: boolean
		count: number
	}) => JSX.Element
}
function CountDown(props: CountDownProps) {
	const { num, children } = props
	const [count, setCount] = useState(() => num)
	const [clear, start, active] = useInterval(() => {
		setCount((p) => p - 1)
	}, 1000)
	useEffect(() => {
		if (count === 0 && active) {
			clear() // 停止计时
			setCount(num)
		}
	}, [count, active, clear, num])
	return typeof children === "function" ? (
		children({ clear, start, active, count })
	) : (
		<></>
	)
}

export default CountDown
