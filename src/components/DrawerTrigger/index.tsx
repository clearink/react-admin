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
import { Drawer } from "antd"
import { isFunction } from "@/utils/data/validate"
import { DrawerProps } from "antd/lib/drawer"
import { useSwitch } from "../Pro/hooks/boolean"

// antd 抽屉封装
interface DrawerTriggerProps extends Omit<DrawerProps, "visible"> {
	trigger?: ReactNode
	children?: ReactNode
}
export interface ModalTriggerRef {
	toggle: (e?: MouseEvent) => void
	visible: boolean
	on: () => void
	off: () => void
}
// 为了使数据请求更加流畅 modal trigger 劫持 afterVisibleChange函数 向下传入 isFinish 字段
export type DrawerTriggerRef = ModalTriggerRef
function DrawerTrigger(props: DrawerTriggerProps, ref: Ref<DrawerTriggerRef>) {
	const { trigger, children, ...rest } = props
	const [visible, on, off, toggle] = useSwitch()

	useImperativeHandle(ref, () => ({ visible, on, off, toggle }), [
		visible,
		on,
		off,
		toggle,
	])

	const wrappedTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				const { onClick } = trigger.props
				onClick?.(e)
				on()
			},
		})
	}, [trigger, on])
	const handleClose: DrawerProps["onClose"] = (e) => {
		off()
		rest.onClose?.(e)
	}
	return (
		<>
			{wrappedTrigger}
			<Drawer visible={visible} {...rest} onClose={handleClose}>
				{isFunction(children) ? children({ visible, toggle }) : children}
			</Drawer>
		</>
	)
}

export default memo(forwardRef(DrawerTrigger))
