import { Button, Space } from "antd"
import { ButtonProps } from "antd/lib/button"
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

	const handleReset: ButtonProps["onClick"] = (e) => {
		form?.resetFields()
		RP?.onClick?.(e)
	}
	const handleSubmit: ButtonProps["onClick"] = (e) => {
		form?.submit()
		SP?.onClick?.(e)
	}
	const resetProps = { ...RP, key: "rest", onClick: handleReset }
	const submitProps = { ...SP, key: "submit", loading, onClick: handleSubmit }

	const dom = [
		<Button {...resetProps}>{resetText}</Button>,
		<Button {...submitProps} type='primary'>
			{submitText}
		</Button>,
	]
	if (render) return <>{render(dom, form, props)}</>
	return <Space>{dom}</Space>
}

export default memo(Submitter)
