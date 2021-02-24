import { isFunction } from "@/utils/data/validate"
import useCountDown from "@/components/Pro/hooks/count-down"
import { forwardRef, useImperativeHandle } from "react"

// 倒计时组件 默认 60s
interface CountDownProps {
	num: number
	onTarget?: () => void
	children: (props: {
		start: () => void
		reset: () => void
		active: boolean
		count: number
	}) => JSX.Element
}
export interface CountDownRef {
	start: () => void
	reset: () => void
	active: boolean
	count: number
}
function CountDown(props: CountDownProps, ref: React.Ref<CountDownRef>) {
	const { num, children, onTarget } = props
	const [{ count, active }, start, reset] = useCountDown(num, onTarget)
	useImperativeHandle(ref, () => ({ start, reset, active, count }))
	if (isFunction(children)) return children({ start, reset, active, count })
	return null
}

export default forwardRef(CountDown)
