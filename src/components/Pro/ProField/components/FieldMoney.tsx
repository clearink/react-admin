import React, { Ref, useImperativeHandle, useMemo, useRef } from "react"
import { InputNumber } from "antd"
import { formatMoney, removeSeparator } from "@/utils/formatValues"
import { BaseProFieldProps } from "../type"
import { InputNumberProps } from "antd/lib/input-number"
import { moneySign } from "../../utils"
import withProField from "../../hocs/withProField"

const defaultForItemProps: Partial<InputNumberProps> = {
	placeholder: "请输入",
	min: 0,
	precision: 2,
	style: { width: 150 },
	formatter: (value) => (value ? formatMoney(value) : ""),
	parser: (value) => (value ? removeSeparator(value, "\\s+|(,*)") : ""),
}
export interface FieldMoneyProps extends BaseProFieldProps {
	forItemProps?: InputNumberProps
	locale?: keyof typeof moneySign
	text: string | number
}

function FieldMoney(props: FieldMoneyProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		locale,
		forItemProps,
		...rest
	} = props

	const prefix = useMemo(() => moneySign[locale ?? ""] ?? "", [locale]) // 前缀

	if (mode === "read") {
		const money = formatMoney(text ?? 0)
		const dom = <span>{`${prefix}${money}`}</span>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const editProps = { ...defaultForItemProps, ...forItemProps }
	const formItemDom = <InputNumber {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...forItemProps }, formItemDom)
	return formItemDom
}

export default withProField(FieldMoney, {
	text: 0,
	locale: "zh-cn",
})
