import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	ReactNode,
	RefObject,
	useImperativeHandle,
	useMemo,
} from "react"
import { Modal } from "antd"
import { ModalProps } from "antd/lib/modal"
import useBoolean from "@/hooks/useBoolean"
// antd 模态框封装
interface IProps extends Omit<ModalProps, "visible"> {
	trigger?: ReactNode
	children?: ReactNode
}
function ModalTrigger<T>(props: IProps, ref: RefObject<T>) {
	const { trigger, children, ...rest } = props
	const [visible, toggle] = useBoolean(false)

	useImperativeHandle(ref, () => ({ toggle }))

	const wrappedTrigger = useMemo(() => {
		if (!trigger || !isValidElement(trigger)) return trigger
		console.log(trigger.props)
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				const { onClick } = trigger.props
				onClick ? onClick(e, toggle) : toggle()
			},
		})
	}, [trigger, toggle])
	return (
		<>
			{wrappedTrigger}
			<Modal visible={visible} onCancel={toggle as any} {...rest}>
				{children}
			</Modal>
		</>
	)
}

export default forwardRef(ModalTrigger)
