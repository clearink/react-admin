import React, { memo, useMemo } from "react"
import { BaseProFieldProps } from "../../type"
import { toNumber } from "./utils"
import { removeSeparator } from "@/utils/formatValues"
import PercentString from "./PercentString"
import GetValue from "@/utils/GetValue"
import withDefaultProps from "@/hocs/withDefaultProps"

interface FieldPercentProps extends BaseProFieldProps<FieldPercentProps> {
	text: number
	precision: number
	suffix?: React.ReactNode
	prefix?: React.ReactNode
	hasSymbol?: boolean // 是否有符号
	hasColor?: boolean
}

function FieldPercent(props: FieldPercentProps) {
	const { text, render, ...rest } = props

	const numberValue = useMemo(() => {
		return toNumber(removeSeparator(text, "%"))
	}, [text])

	// 格式化成百分比
	const DOM = (
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
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}

export default memo(
	withDefaultProps(FieldPercent, {
		hasColor: true,
		hasSymbol: true,
		suffix: "%",
		precision: 2,
	})
)
