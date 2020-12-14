import withDefaultProps from "@/hocs/withDefaultProps"
import { Button, Space } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { memo } from "react"
import { CommonFormProps } from "../../ProForm/components/BaseForm/type"

// 表单提交和重置按钮
type SubmitterProps = CommonFormProps["submitConfig"] & {
	form: FormInstance
	onReset?: () => void
	onSubmit?: () => void
}
function Submitter(props: SubmitterProps) {
	const {
		resetButtonProps: RP,
		submitButtonProps: SP,
		render,
		form,
		onReset,
		onSubmit,
	} = props
	const submitText = SP?.text ?? "提交"
	const resetText = RP?.text ?? "重置"
	// 默认是
	const dom = [
		<Button
			{...RP}
			key='rest'
			onClick={(e) => {
				form.resetFields()
				onReset?.()
				RP?.onClick?.(e)
			}}
		>
			{resetText}
		</Button>,
		<Button
			{...SP}
			key='submit'
			type='primary'
			onClick={(e) => {
				form.submit()
				onSubmit?.()
				SP?.onClick?.(e)
			}}
		>
			{submitText}
		</Button>,
	]
	if (render) return render(props, dom) as JSX.Element
	return <Space>{dom}</Space>
}

export default memo(
	withDefaultProps(Submitter, {
		resetButtonProps: {},
		submitButtonProps: {},
	})
)
