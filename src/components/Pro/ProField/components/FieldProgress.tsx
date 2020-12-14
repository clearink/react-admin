import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber, Progress } from "antd"
import { ProFieldProps } from "./type"
import { toNumber } from "./Percent/utils"

interface IProps extends ProFieldProps {
	text: number | string
	fieldProps: any
}
// 进度条
function FieldProgress(props: IProps, ref: Ref<any>) {
	console.log("function FieldProgress(props: IProps, ref: Ref<any>) {", props)
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldProps,
		fieldEnum,
		...rest
	} = props

	const numberValue = toNumber(text)
	const dom = <Progress percent={numberValue} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDom = <InputNumber placeholder="请输入" min={0} max={100} {...rest} {...fieldProps} />
	if (renderFormItem) renderFormItem(text, { mode, ...rest }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldProgress), {
		text: "",
		mode: "read",
		fieldEnum: {},
	})
)
