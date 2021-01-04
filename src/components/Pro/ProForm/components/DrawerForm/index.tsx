import { useToggle } from "@/components/Pro/hooks/boolean"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import { Drawer, Form, message } from "antd"
import { ButtonProps } from "antd/lib/button"
import { DrawerProps } from "antd/lib/drawer"
import { FormInstance } from "antd/lib/form"
import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	memo,
	ReactNode,
	Ref,
	useImperativeHandle,
	useMemo,
	useState,
} from "react"
import { createPortal } from "react-dom"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import Submitter from "../Submitter"

export interface DrawerFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger: ReactNode
	drawerProps?: Omit<DrawerProps, "title">
	title?: TitleTipProps["title"]
}
export interface DrawerFormRef {
	toggle: () => void
	form: FormInstance
}
function DrawerForm(
	props: DrawerFormProps,
	ref: Ref<DrawerFormRef | undefined>
) {
	const { children, trigger, drawerProps, title, onFinish, ...rest } = props
	// 内部状态
	const [isOpen, setIsOpen] = useState(false)
	const [visible, toggle] = useToggle()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)
	const [form] = Form.useForm(rest.form)
	const handleFinish = async (values: any) => {
		// 提交完成关闭 drawer 重置表单
		try {
			setLoading({ delay: 100 })
			await onFinish?.(values)
			toggle()
			form.resetFields()
		} catch (error) {
			throw error
		} finally {
			setLoading(false)
		}
	}
	/** 外部控制 显示隐藏 */
	useImperativeHandle(
		ref,
		() => ({
			toggle,
			form,
			open: isOpen,
		}),
		[form, toggle]
	)

	const wrapperTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger
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
			form={form}
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

export default memo(forwardRef(DrawerForm))
