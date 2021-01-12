import React, { memo, useMemo } from "react"
import { formatMoney } from "@/utils/formatValues"
import { moneySign } from "../../utils"
import withDefaultProps from "@/hocs/withDefaultProps"
import { BaseProFieldProps } from "../type"

export interface FieldMoneyProps extends BaseProFieldProps<FieldMoneyProps> {
	text: string | number
	locale?: keyof typeof moneySign
}

function FieldMoney(props: FieldMoneyProps) {
	const { text, render, locale } = props

	const prefix = useMemo(() => moneySign[locale ?? ""] ?? "", [locale]) // 前缀
	const money = formatMoney(text ? text : 0)

	const dom = <span>{`${prefix}${money}`}</span>
	if (render) return render({ text, locale }, dom)
	return dom
}

export default memo(
	withDefaultProps(FieldMoney, {
		text: 0,
		locale: "zh-cn",
	})
)
