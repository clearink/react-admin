import React, { memo, useMemo } from "react"
import { DatePicker } from "antd"
import moment, { Moment, isMoment } from "moment"
import { BaseProFieldProps } from "../../type"
import withProField from "@/components/Pro/hocs/withProField"
import withDefaultProps from "@/hocs/withDefaultProps"

// 日期相关
// 最基本的 date
export interface FieldDateProps extends BaseProFieldProps<FieldDateProps> {
	text?: Moment | string | number
	timeFormat?: string
	fromNow?: boolean
}

function FieldDate(props: FieldDateProps) {
	const {
		text,
		render,
		timeFormat,
		fromNow, // 是否是根据当前时间算的
		...rest
	} = props

	const timeValue = useMemo(() => (isMoment(text) ? text : moment(text)), [
		text,
	])
	const DOM = (
		<span>{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}</span>
	)

	if (render) return render({ text, timeFormat, fromNow, ...rest }, DOM)
	return DOM
}
export default memo(
	withDefaultProps(FieldDate, {
		fromNow: false,
		timeFormat: "YYYY-MM-DD",
	})
)
