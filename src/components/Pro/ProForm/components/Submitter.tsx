import { Button, Space } from "antd"
import { ButtonProps } from "antd/lib/button"
import React, { memo, useContext } from "react"
import useMountedRef from "../../hooks/mounted-ref"
import { SubmitConfigType } from "../type"
import ProFormContext from "./BaseForm/ProFormContext"

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

	const mountedRef = useMountedRef()
	const handleReset: ButtonProps["onClick"] = (e) => {
		form?.resetFields()
		RP?.onClick?.(e)
	}
	const handleSubmit: ButtonProps["onClick"] = (e) => {
		form?.submit()
		SP?.onClick?.(e)
	}
	const resetProps = { key: "rest", ...RP, onClick: handleReset }
	const submitProps = { key: "submit", loading, ...SP, onClick: handleSubmit }

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
