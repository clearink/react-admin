import { useSwitch } from "@/components/Pro/hooks/boolean"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import { Drawer, Space } from "antd"
import Button, { ButtonProps } from "antd/lib/button"
import { DrawerProps } from "antd/lib/drawer"
import Form, { FormInstance } from "antd/lib/form"
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

export interface DrawerFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger?: ReactNode
	drawerProps?: Omit<DrawerProps, "title">
	title?: TitleTipProps["title"]
	/** 返回 true 关闭 drawer 且重置表单 */
	onFinish?: (values: any) => Promise<boolean>
}

/** drawerForm 暴露出 的 方法
 * toggle 控制 drawer 的显示隐藏
 * form 外部控制form的实例
 * */
export interface DrawerFormRef {
	toggle: () => void
	form: FormInstance
}

function DrawerForm(props: DrawerFormProps, ref: Ref<DrawerFormRef>) {
	const {
		children,
		trigger,
		drawerProps,
		title,
		onFinish,
		form: PropsForm,
		...rest
	} = props
	// 内部状态
	const [visible, on, off, toggle] = useSwitch()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)

	// 为了 能够控制 drawer 的 footer
	const [form] = Form.useForm(PropsForm)

	const handleFinish = async (values: any) => {
		// 提交完成关闭 drawer 重置表单
		setLoading({ delay: 100 })
		const result = await onFinish?.(values)
		if (result) {
			off()
			form.resetFields()
		}
		setLoading(false)
	}
	/** 外部控制 显示隐藏 */
	useImperativeHandle(ref, () => ({ toggle, form }), [toggle, form])

	const submitter = (
		<Space>
			<Button onClick={off}>取消</Button>
			<Button type='primary' loading={loading} onClick={form.submit}>
				确认
			</Button>
		</Space>
	)
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

	const handleClose = (e: any) => {
		off()
		drawerProps?.onClose?.(e)
	}
	const DOM = (
		<BaseForm
			name='drawer-form'
			submitConfig={false}
			layout='vertical'
			{...rest}
			form={form}
			onFinish={handleFinish}
		>
			<Drawer
				visible={visible}
				title={<TitleTip title={title} />}
				width={800}
				onClose={handleClose}
				{...drawerProps}
				getContainer={false}
				footerStyle={{ textAlign: "right" }}
				footer={submitter}
			>
				{children}
			</Drawer>
		</BaseForm>
	)
	const portal = createPortal(DOM, document.querySelector("body") as Element)
	return (
		<>
			{wrappedTrigger}
			{portal}
		</>
	)
}

export default memo(forwardRef(DrawerForm))
