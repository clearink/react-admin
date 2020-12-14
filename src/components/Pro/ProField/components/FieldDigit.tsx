import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { ProFieldProps } from "./type"
import { formatNumber } from "../utils"

interface IProps extends ProFieldProps {
	text: number
	fieldProps: any
}

function FieldDigit(props: IProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, fieldProps, ...rest } = props

	// const inputRef = useRef()
	// useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	if (mode === "read") {
		const dom = <span>{formatNumber(text)}</span>
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	// 渲染 form
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...fieldProps }, <>{text}</>)
	return <InputNumber placeholder='请输入' min={0} {...rest} {...fieldProps} />
}

export default memo(
	withDefaultProps(forwardRef(FieldDigit), {
		text: 0,
		mode: "read",
	})
)
