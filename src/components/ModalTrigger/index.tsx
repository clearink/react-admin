import React, { cloneElement, isValidElement, ReactNode, useMemo } from "react"
import { Modal } from "antd"
import { ModalProps } from "antd/lib/modal"
import useBoolean from "@/hooks/useBoolean"
// antd 模态框封装
interface IProps extends Omit<ModalProps, "visible"> {
	trigger: ReactNode
	children?: ReactNode
}
function ModalTrigger(props: IProps) {
	const { trigger, children, ...rest } = props
	const [visible, toggle] = useBoolean(false)
	const wrappedTrigger = useMemo(() => {
		if (!trigger || !isValidElement(trigger)) return trigger
		console.log(trigger.props)
		return cloneElement(trigger)
	}, [trigger])
	return (
		<>
			{wrappedTrigger}
			<Modal {...rest} visible={visible}>
				{children}
			</Modal>
		</>
	)
}

export default ModalTrigger
