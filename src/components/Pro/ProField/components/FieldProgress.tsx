import React, { forwardRef, memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber, Progress } from "antd"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { ProgressProps } from "antd/lib/progress"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"

// 进度条
export interface FieldProgressProps
	extends Pick<BaseProFieldProps, "mode" | "render" | "renderFormItem">,
		ProgressProps,
		InputNumberProps {
	text?: number | string
	size?: ProgressProps["size"] & InputNumberProps["size"]
	type?: ProgressProps["type"] & InputNumberProps["type"]
	width?: ProgressProps["width"] & InputNumberProps["width"]
}

function FieldProgress(props: FieldProgressProps) {
	const { text, mode, render, renderFormItem, ...rest } = props
	const readProps = FilterValue(rest, inputNumberPropsArray)
	const editProps = GetValue(rest, [
		...inputNumberPropsArray,
		"size",
		"width",
		"type",
		"className",
		"style",
	])

	const numberValue = Number(text)
	const dom = <Progress percent={numberValue} {...readProps} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...readProps }, dom)
		return dom
	}
	const formDom = (
		<InputNumber
			style={{ width: 140 }}
			min={0}
			max={100}
			placeholder='请输入'
			{...editProps}
		/>
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...editProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldProgress), {
		value: "",
		mode: "read",
	})
)

const inputNumberPropsArray: Array<keyof InputNumberProps> = [
	"autoFocus",
	"decimalSeparator",
	"defaultValue",
	"disabled",
	"formatter",
	"max",
	"min",
	"parser",
	"precision",
	"readOnly",
	"step",
	"value",
	"onChange",
	"onPressEnter",
	"onStep",
]
