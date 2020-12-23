import withDefaultProps from "@/hocs/withDefaultProps"
import { Button, Space } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { memo } from "react"
import { SubmitConfigType } from "../type"

/**
 * Q: 	onReset, onSubmit, 这两个有什么用 暂时没有发现
 *  先注释掉
 */

// 表单提交和重置按钮
interface SubmitterProps extends SubmitConfigType {
	form: FormInstance
}
function Submitter(props: SubmitterProps) {
	const { resetProps: RP, submitProps: SP, render, form } = props
	const submitText = SP?.text ?? "提交"
	const resetText = RP?.text ?? "重置"

	const dom = [
		<Button
			key='rest'
			{...RP}
			onClick={(e) => {
				form.resetFields()
				// onReset?.()
				RP?.onClick?.(e)
			}}
		>
			{resetText}
		</Button>,
		<Button
			key='submit'
			type='primary'
			{...SP}
			onClick={(e) => {
				form.submit()
				// onSubmit?.()
				SP?.onClick?.(e)
			}}
		>
			{submitText}
		</Button>,
	]
	if (render) return <>{render(dom, form, props)}</>
	return <Space>{dom}</Space>
}

export default memo(
	withDefaultProps(Submitter, {
		resetProps: {},
		submitProps: {},
	})
)
