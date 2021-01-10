import { isFunction } from "@/utils/validate"
import useCountDown from "@/components/Pro/hooks/count-down"

// 倒计时组件 默认 60s
interface CountDownProps {
	num: number
	children: (props: {
		start: () => void
		reset: () => void
		active: boolean
		count: number
	}) => JSX.Element
}
function CountDown(props: CountDownProps) {
	const { num, children } = props
	const [{ count, active }, start, reset] = useCountDown(num)
	if (isFunction(children)) return children({ start, reset, active, count })
	return null
}

export default CountDown
