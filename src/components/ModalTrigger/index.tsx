import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	memo,
	ReactNode,
	Ref,
	useImperativeHandle,
	useMemo,
} from "react"
import { Modal } from "antd"
import { ModalProps } from "antd/lib/modal"
import { isFunction } from "@/utils/data/validate"
import { useSwitch } from "../Pro/hooks/boolean"
// antd 模态框封装
interface IProps extends Omit<ModalProps, "visible"> {
	trigger?: ReactNode
	children?: ReactNode
}
export interface ModalTriggerRef {
	toggle: (e?: MouseEvent) => void
	visible: boolean
	on: () => void
	off: () => void
}
function ModalTrigger(props: IProps, ref: Ref<ModalTriggerRef>) {
	const { trigger, children, ...rest } = props
	const [visible, on, off, toggle] = useSwitch()

	useImperativeHandle(ref, () => ({ visible, on, off, toggle }), [
		off,
		on,
		toggle,
		visible,
	])

	const wrappedTrigger = useMemo(() => {
		if (!trigger || !isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				const { onClick } = trigger.props
				onClick?.(e)
				on()
			},
		})
	}, [trigger, on])
	const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		off()
		rest.onCancel?.(e)
	}
	return (
		<>
			{wrappedTrigger}
			<Modal visible={visible} {...rest} onCancel={handleCancel}>
				{isFunction(children) ? children({ visible, toggle }) : children}
			</Modal>
		</>
	)
}

export default memo(forwardRef(ModalTrigger))
