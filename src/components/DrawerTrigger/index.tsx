import React, {
	cloneElement,
	createContext,
	forwardRef,
	isValidElement,
	memo,
	ReactNode,
	Ref,
	useCallback,
	useImperativeHandle,
	useMemo,
	useState,
} from "react"
import { Drawer, Modal } from "antd"
import { ModalProps } from "antd/lib/modal"
import useBoolean from "@/hooks/useBoolean"
import { isFunction } from "@/utils/validate"
import { DrawerProps } from "antd/lib/drawer"
// antd 模态框封装
interface DrawerTriggerProps extends Omit<DrawerProps, "visible"> {
	trigger?: ReactNode
	children?: ReactNode
}
export interface IModalTriggerRef {
	toggle: (e?: MouseEvent, t?: () => void) => void
	visible: boolean
	//((instance: T | null) => void) | MutableRefObject<T | null> | null)
}
// 为了使数据请求更加流畅 modal trigger 劫持 afterVisibleChange函数 向下传入 isFinish 字段

function DrawerTrigger(
	props: DrawerTriggerProps,
	ref: Ref<IModalTriggerRef | undefined>
) {
	const { trigger, children, ...rest } = props
	const [visible, toggle] = useBoolean(false)

	useImperativeHandle(ref, () => ({ toggle, visible }), [toggle, visible])

	const wrappedTrigger = useMemo(() => {
		if (!trigger || !isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				const { onClick } = trigger.props
				onClick ? onClick(e, toggle) : toggle()
			},
		})
	}, [trigger, toggle])
	const handleClose: DrawerProps["onClose"] = (e) => {
		toggle()
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
