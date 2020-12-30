import React from "react"
import { InputNumber, Progress } from "antd"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { ProgressProps } from "antd/lib/progress"
import withProField from "../../hocs/withProField"
import { toNumber } from "../../utils"

// 进度条
export interface FieldProgressProps extends BaseProFieldProps, ProgressProps {
	text?: number | string
	formItemProps?: InputNumberProps
}

function FieldProgress(props: FieldProgressProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

	const numberValue = toNumber(text)
	const dom = <Progress percent={numberValue} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formDom = <InputNumber {...formItemProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...formItemProps }, formDom)
	return formDom
}

export default withProField(FieldProgress, { text: "" })
