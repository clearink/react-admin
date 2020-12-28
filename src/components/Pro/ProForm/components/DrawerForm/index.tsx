import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import useBoolean from "@/hooks/useBoolean"
import useDeepMemo from "@/hooks/useDeepMemo"
import { Drawer } from "antd"
import { ButtonProps } from "antd/lib/button"
import { DrawerProps } from "antd/lib/drawer"
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

export interface DrawerFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger: JSX.Element
	drawerProps?: Omit<DrawerProps, "title">
	title?: TitleTipProps["title"]
}

function DrawerForm(props: DrawerFormProps) {
	const { children, trigger, drawerProps, title, onFinish, ...rest } = props
	// 内部状态
	const [isOpen, setIsOpen] = useState(false)
	const [visible, toggle] = useBoolean()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)

	const handleFinish = async (values: any) => {
		setLoading({ delay: 100 })
		await onFinish?.(values)
		setLoading(false)
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
			<Drawer
				visible={visible}
				title={<TitleTip title={title} />}
				width={800}
				getContainer={false}
				onClose={toggle}
				afterVisibleChange={setIsOpen}
				{...drawerProps}
				footerStyle={{ textAlign: "right" }}
				footer={submitter}
			>
				{children}
			</Drawer>
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

export default memo(DrawerForm)
