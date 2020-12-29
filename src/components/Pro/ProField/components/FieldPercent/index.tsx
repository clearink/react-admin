import React, { forwardRef, memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { BaseProFieldProps } from "../../type"
import classNames from "classnames"
import { InputNumberProps } from "antd/lib/input-number"
import { InputNumber } from "antd"
import { getPrecisionNumber, getSymbol, toNumber } from "./utils"
import { removeSeparator } from "@/utils/formatValues"
import "./style.scss"
import withProField from "@/components/Pro/hocs/withProField"

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
	const {
		text,
		mode,
		render,
		renderFormItem,
		suffix,
		prefix,
		hasSymbol,
		hasColor,
		precision,
		formItemProps,
		...rest
	} = props

	const numberValue = useMemo(() => {
		return toNumber(removeSeparator(text, "%"))
	}, [text])

	if (mode === "read") {
		// 格式化成百分比
		const dom = (
			<span
				className={classNames({
					"pro_filed__percent--default": !hasColor,
					"pro_filed__percent--color1": numberValue > 0,
					"pro_filed__percent--color2": numberValue < 0,
				})}
			>
				{prefix && <span>{prefix}</span>}
				{hasSymbol && (
					<span className='pro_field__percent--symbol	'>
						{getSymbol(numberValue)}
					</span>
				)}
				{getPrecisionNumber(
					hasSymbol ? Math.abs(numberValue) : numberValue,
					precision
				)}
				{suffix && <span>{suffix}</span>}
			</span>
		)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// 渲染 form
	const formItemDom = (
		<InputNumber {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps },
			formItemDom
		)
	return formItemDom
}

export default withProField(FieldPercent, {
	hasColor: true,
	hasSymbol: true,
	suffix: "%",
	precision: 2,
	formItemProps: defaultFormItemProps,
})
