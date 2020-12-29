import { TitleTip } from "@/components/Pro/ProCard/components"
import useBoolean from "@/hooks/useBoolean"
import useDeepMemo from "@/hooks/useDeepMemo"
import { ButtonProps } from "antd/lib/button"
import Modal, { ModalProps } from "antd/lib/modal/Modal"
import React, {
	cloneElement,
	isValidElement,
	memo,
	ReactNode,
	useMemo,
	useState,
} from "react"
import { createPortal } from "react-dom"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import Submitter from "../Submitter"

export interface ModalFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger: JSX.Element
	modalProps?: Omit<ModalProps, "title">
	title?: string | { title: string; tooltip?: string }
}

function ModalForm(props: ModalFormProps) {
	const { children, trigger, modalProps, title, onFinish, ...rest } = props
	// 内部状态
	const [isOpen, setIsOpen] = useState(false)
	const [visible, toggle] = useBoolean()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)

	const TT = useDeepMemo(() => {
		if (typeof title === "string") return <TitleTip title={title} />
		return <TitleTip title={title?.title} tooltip={title?.tooltip} />
	}, [title])

	const handleFinish = async (values: any) => {
		setLoading({ delay: 100 })
		await onFinish?.(values)
		setLoading(false)
		toggle()
	}

	const wrapperTrigger = useMemo(() => {
		if (!trigger && !isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				toggle()
				trigger.props.onClick?.(e)
			},
		})
	}, [toggle, trigger])
	const submitter = (
		<Submitter
			resetProps={{
				text: "取消",
				onClick: toggle,
			}}
			submitProps={{ text: "确认", loading }}
			{...props.submitConfig}
		/>
	)

	const DOM = (
		<BaseForm
			submitConfig={{ render: () => null }}
			layout='vertical'
			{...rest}
			onFinish={handleFinish}
		>
			<Modal
				visible={visible}
				title={TT}
				width={600}
				getContainer={false}
				onCancel={toggle}
				afterClose={()=>{
					console.log('已关闭')
				}}
				{...modalProps}
				footer={submitter}
			>
				{children}
			</Modal>
		</BaseForm>
	)
	const formPortal = createPortal(
		DOM,
		document.querySelector("body") as Element
	)
	return (
		<div>
			{wrapperTrigger}
			{formPortal}
		</div>
	)
}

export default memo(ModalForm)
