import React, { useMemo } from "react"
import { BaseProFieldProps } from "../../type"
import classNames from "classnames"
import { InputNumberProps } from "antd/lib/input-number"
import { InputNumber } from "antd"
import { getPrecisionNumber, getSymbol, toNumber } from "./utils"
import { removeSeparator } from "@/utils/formatValues"
import "./style.scss"
import withProField from "@/components/Pro/hocs/withProField"
import PercentString from "./PercentString"
import GetValue from "@/utils/GetValue"

// 去除 min 和 max
interface FieldPercentProps extends BaseProFieldProps {
	precision: number
	formItemProps?: InputNumberProps
	suffix?: React.ReactNode
	prefix?: React.ReactNode
	hasSymbol?: boolean // 是否有符号
	hasColor?: boolean
	text: number
}
const defaultFormItemProps: InputNumberProps = {
	precision: 2,
	min: 0,
	max: 100,
	width: 120,
	placeholder: "请输入",
}

function FieldPercent(props: FieldPercentProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

	const numberValue = useMemo(() => {
		return toNumber(removeSeparator(text, "%"))
	}, [text])

	if (mode === "read") {
		// 格式化成百分比
		const dom = (
			<PercentString
				text={numberValue}
				{...GetValue(rest, [
					"suffix",
					"prefix",
					"hasSymbol",
					"hasColor",
					"precision",
				])}
			/>
		)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}

	const editProps = { ...defaultFormItemProps, ...formItemProps }
	const formItemDom = <InputNumber {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...editProps }, formItemDom)
	return formItemDom
}

export default withProField(FieldPercent, {
	hasColor: true,
	hasSymbol: true,
	suffix: "%",
	precision: 2,
})
