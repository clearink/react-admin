import withDefaultProps from "@/hocs/withDefaultProps"
import { Button, Space } from "antd"
import React, { memo, useContext } from "react"
import ProFormContext from "../../utils/ProFormContext"
import { SubmitConfigType } from "../type"

/**
 * Q: 	onReset, onSubmit, 这两个有什么用 暂时没有发现
 *  先注释掉
 */

// 表单提交和重置按钮
interface SubmitterProps extends SubmitConfigType {}
function Submitter(props: SubmitterProps) {
	const { resetProps: RP, submitProps: SP, render } = props
	const { form, loading } = useContext(ProFormContext)
	const submitText = SP?.text ?? "提交"
	const resetText = RP?.text ?? "重置"
	const dom = [
		<Button
			key='rest'
			{...RP}
			onClick={(e) => {
				form?.resetFields()
				RP?.onClick?.(e)
			}}
		>
			{resetText}
		</Button>,
		<Button
			key='submit'
			type='primary'
			loading={loading}
			{...SP}
			onClick={(e) => {
				form?.submit()
				SP?.onClick?.(e)
			}}
		>
			{submitText}
		</Button>,
	]
	if (render) return <>{render(dom, form, props)}</>
	return <Space>{dom}</Space>
}

export default memo(Submitter)
