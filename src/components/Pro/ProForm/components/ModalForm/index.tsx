import { useSwitch } from "@/components/Pro/hooks/boolean"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import { ButtonProps } from "antd/lib/button"
import { Form, Modal } from "antd"
import { FormInstance } from "antd/lib/form"
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

export interface ModalFormProps extends Omit<BaseFormProps, "title"> {
	children?: ReactNode
	trigger?: ReactNode
	modalProps?: Omit<ModalProps, "title">
	title?: TitleTipProps["title"]
	onFinish?: (values: any) => Promise<boolean>
}
export type ModalFormRef =
	| {
			form: FormInstance
			toggle: () => void
	  }
	| undefined
function ModalForm(props: ModalFormProps, ref: Ref<ModalFormRef>) {
	const { children, trigger, modalProps, title, onFinish, ...rest } = props
	// 内部状态
	const [visible, on, off, toggle] = useSwitch()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)

	const [form] = Form.useForm(rest.form) // 防止外部传入form实例

	useImperativeHandle(ref, () => ({ form, toggle }), [toggle, form])

	const handleFinish = async (values: any) => {
		// 提交完成关闭 modal 重置表单
		try {
			setLoading({ delay: 100 })
			await onFinish?.(values)
			off()
			form.resetFields()
		} catch (error) {
			throw error
		} finally {
			setLoading(false)
		}
	}
	const wrapperTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				on()
				trigger.props.onClick?.(e)
			},
		})
	}, [on, trigger])

	return (
		<div>
			{wrapperTrigger}
			<Modal
				visible={visible}
				title={<TitleTip title={title} />}
				width={600}
				getContainer={false}
				onCancel={off}
				{...modalProps}
				onOk={form.submit}
				confirmLoading={!!loading}
			>
				<BaseForm
					submitConfig={false}
					layout='vertical'
					form={form}
					{...rest}
					onFinish={handleFinish}
				>
					{children}
				</BaseForm>
			</Modal>
		</div>
	)
}

export default memo(forwardRef(ModalForm))
