import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber, Progress } from "antd"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { ProgressProps } from "antd/lib/progress"

// 进度条
interface FieldProgressProps
	extends Pick<BaseProFieldProps, "mode" | "render" | "renderFormItem">,
		ProgressProps {
	text?: number | string
	formItemProps?: Omit<InputNumberProps, "min" | "max">
}

function FieldProgress(props: FieldProgressProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

	const numberValue = Number(text)
	const dom = <Progress percent={numberValue} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formDom = (
		<InputNumber
			style={{ width: 140 }}
			min={0}
			max={100}
			placeholder='请输入'
			{...formItemProps}
		/>
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...formItemProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldProgress), {
		text: "",
		mode: "read",
	})
)
