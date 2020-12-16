import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { formatNumber } from "../utils"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"

interface FieldDigitProps extends BaseProFieldProps, InputNumberProps {}
function FieldDigit(props: FieldDigitProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, ...rest } = props
	// const inputRef = useRef()
	// useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	if (mode === "read") {
		const dom = <span>{formatNumber(text)}</span>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// 渲染 form
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest }, <>{text}</>)
	return <InputNumber {...rest} />
}

export default memo(
	withDefaultProps(forwardRef(FieldDigit), {
		text: 0,
		mode: "read",
		placeholder: "请输入",
		min: 0,
		style: { width: 200 },
	})
)