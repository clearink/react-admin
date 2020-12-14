import React, { forwardRef, memo, ReactNode, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { ProFieldProps } from "./type"
import { formatSecond } from "../utils"

interface IProps extends ProFieldProps {
	text: number
	fieldProps: any
}

// 时间格式化
function FieldSecond(props: IProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, fieldProps, ...rest } = props
	// const inputRef = useRef()
	// useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const second = useMemo(() => <span>{formatSecond(text)}</span>, [text])
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, ...fieldProps }, second)
		return second
	}
	// 渲染 form
	const formDom = (
		<InputNumber placeholder='请输入' min={0} {...rest} {...fieldProps} />
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldSecond), {
		text: 0,
		mode: "read",
	})
)
