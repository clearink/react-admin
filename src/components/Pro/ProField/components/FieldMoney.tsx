import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { formatMoney, removeSeparator } from "@/utils/formatValues"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { moneySign } from "../../utils"

export interface FieldMoneyProps
	extends BaseProFieldProps,
		Omit<InputNumberProps, "value"> {
	locale?: keyof typeof moneySign
	value: string | number
}

function FieldMoney(props: FieldMoneyProps, ref: Ref<any>) {
	const { mode, render, renderFormItem, locale, value, ...rest } = props

	const inputRef = useRef()
	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const prefix = useMemo(() => moneySign[locale ?? ""] ?? "", [locale]) // 前缀

	if (mode === "read") {
		const money = formatMoney(value ?? 0)
		const dom = <span>{`${prefix}${money}`}</span>
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	const formItemDom = <InputNumber ref={inputRef} {...rest} />
	if (renderFormItem)
		return renderFormItem(value, { mode, ...rest }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldMoney), {
		value: "0",
		mode: "read",
		locale: "zh-cn",
		placeholder: "请输入",
		min: 0,
		precision: 2,
		style: { width: 150 },
		formatter: (value: string | number) => (value ? formatMoney(value) : ""),
		parser: (value: string) =>
			value ? removeSeparator(value, "\\s+|(,*)") : "",
	})
)
