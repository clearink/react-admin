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
import { formatMoney, removeSeparator } from "@/utils/regExp"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { moneySign } from "../../utils"

interface FieldMoneyProps extends BaseProFieldProps, InputNumberProps {
	locale?: keyof typeof moneySign
}

function FieldMoney(props: FieldMoneyProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, locale, ...rest } = props

	const inputRef = useRef()
	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const prefix = useMemo(() => moneySign[locale ?? ""], [locale]) // 前缀

	if (mode === "read") {
		const money = formatMoney(text)
		const dom = <span>{`${prefix}${money}`}</span>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formItemDom = <InputNumber ref={inputRef} {...rest} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldMoney), {
		text: "0",
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
