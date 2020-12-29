import React from "react"
import { InputNumber, Progress } from "antd"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { ProgressProps } from "antd/lib/progress"
import withProField from "../../hocs/withProField"
import FilterValue from "@/utils/FilterValue"

// 进度条
export interface FieldProgressProps extends BaseProFieldProps, ProgressProps {
	formItemProps?: InputNumberProps
	text?: number | string
}

const defaultFormItemProps: InputNumberProps = {
	style: { width: 140 },
	min: 0,
	max: 100,
	placeholder: "请输入",
}
function FieldProgress(props: FieldProgressProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

	const numberValue = Number(text)
	const dom = <Progress percent={numberValue} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formDom = (
		<InputNumber
			{...defaultFormItemProps}
			{...FilterValue(rest, ["size"])}
			{...formItemProps}
		/>
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...formItemProps }, formDom)
	return formDom
}

export default withProField(FieldProgress, {
	text: "",
	formItemProps: defaultFormItemProps,
})
