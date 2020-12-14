import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber, Rate } from "antd"
import { ProFieldProps } from "./type"
import { formatNumber } from "../utils"

interface IProps extends ProFieldProps {
	text: number
	fieldProps: any
}

function FieldRate(props: IProps, ref: Ref<any>) {
	console.log("function FieldRate(props: IProps, ref: Ref<any>) {", props)
	const { text, mode, render, renderFormItem, fieldProps, ...rest } = props
	const allow = mode === "read"
	const dom = (
		<Rate
			disabled={allow}
			allowHalf
			allowClear
			defaultValue={text}
			{...rest}
			{...fieldProps}
		/>
	)
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, ...fieldProps }, dom)
	return dom
}

export default memo(
	withDefaultProps(forwardRef(FieldRate), {
		text: 0,
		mode: "read",
	})
)
