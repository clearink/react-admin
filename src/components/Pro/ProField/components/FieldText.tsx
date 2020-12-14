import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Input } from "antd"
import { ProFieldProps } from "./type"

interface IProps extends ProFieldProps {}
function FieldText(props: IProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, fieldProps, ...rest } = props

	const inputRef = useRef<any>()
	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	if (mode === "read") {
		const dom = <span>{text}</span>
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDOM = (
		<Input placeholder='请输入' ref={inputRef} allowClear {...rest} {...fieldProps} />
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...fieldProps }, formDOM)
	return formDOM
}

export default memo(withDefaultProps(forwardRef(FieldText), { text: "-" }))
