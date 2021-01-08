import { useSwitch } from "@/components/Pro/hooks/boolean"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import { Form, Modal } from "antd"
import { ModalProps } from "antd/lib/modal/Modal"
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

import { DrawerFormRef } from "../DrawerForm"

export interface ModalFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger?: ReactNode
	modalProps?: Omit<ModalProps, "title">
	title?: TitleTipProps["title"]
	onFinish?: (values: any) => Promise<boolean>
}

function ModalForm(props: ModalFormProps, ref: Ref<DrawerFormRef>) {
	const { children, trigger, modalProps, title, onFinish, ...rest } = props
	// 内部状态
	const [visible, on, off, toggle] = useSwitch()
	const [loading, setLoading] = useState(false)

	const [form] = Form.useForm(rest.form) // 防止外部传入form实例

	useImperativeHandle(ref, () => ({ form, toggle }), [toggle, form])

	const handleFinish = async (values: any) => {
		// 提交完成关闭 modal 重置表单
		try {
			setLoading(true)
			const result = await onFinish?.(values)
			if (result) {
				off()
				form.resetFields()
			}
		} catch (error) {
			throw error
		} finally {
			setLoading(false)
		}
	}
	const wrappedTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				on()
				trigger.props.onClick?.(e)
			},
		})
	}, [on, trigger])
	const DOM = (
		<BaseForm
			submitConfig={false}
			layout='vertical'
			{...rest}
			form={form}
			onFinish={handleFinish}
		>
			<Modal
				visible={visible}
				title={<TitleTip title={title} />}
				width={600}
				onCancel={off}
				destroyOnClose={false}
				{...modalProps}
				getContainer={false}
				onOk={form.submit}
				confirmLoading={loading}
			>
				{children}
			</Modal>
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

export default memo(forwardRef(ModalForm))
