import React, { forwardRef, memo, ReactNode, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { formatMoney, removeSeparator } from "@/utils/regExp"
import { ProFieldProps } from "./type"

interface IProps extends ProFieldProps {
	text: any
	fieldProps: any
	locale: "zh-cn" | "en-us" | false
}

function FieldMoney(props: IProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		locale,
		fieldProps,
		...rest
	} = props
	// 前缀
	const prefix = useMemo(() => {
		if (locale === "en-us") return "$"
		else if (locale === "zh-cn") return "￥"
		return ""
	}, [locale])
	// const inputRef = useRef()
	// useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	if (mode === "read") {
		const money = formatMoney(text)
		const dom = <span>{`${prefix}${money}`}</span>
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDom = (
		<InputNumber
			placeholder='请输入'
			min={0}
			precision={2}
			formatter={(value) => {
				if (value) return formatMoney(value)
				return ""
			}}
			{...rest}
			parser={(value) => (value ? removeSeparator(value, "\\s|(,*)") : "")}
			{...fieldProps}
		/>
	)
	// 渲染 form
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldMoney), {
		text: "0",
		mode: "read",
		locale: "zh-cn",
	})
)
