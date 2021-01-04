import { memo, useMemo } from "react"
import { RangePickerProps } from "antd/lib/date-picker"
import { isArray, isString } from "@/utils/validate"
import moment, { Moment } from "moment"
import { BaseProFieldProps } from "../../type"
import { momentToText } from "./utils"
import withDefaultProps from "@/hocs/withDefaultProps"

// 日期相关
// 最基本的 date
export interface FieldDateRangeProps
	extends BaseProFieldProps<FieldDateRangeProps> {
	text?:
		| RangePickerProps["value"]
		| [string | number, string | number]
		| string
		| number
	timeFormat?: string
	fromNow?: boolean
}

function FieldDateRange(props: FieldDateRangeProps) {
	const {
		text,
		render,
		timeFormat,
		fromNow, // 是否是根据当前时间算的
		...rest
	} = props

	const timeValue = useMemo(() => {
		if (moment.isMoment(text)) return [text]
		if (!isArray(text)) return [moment(text)]
		return (text as Array<Moment | string | number>).map((item) => moment(item))
	}, [text])

	const DOM = momentToText(timeValue, fromNow, timeFormat)
	if (render) return render({ text, fromNow, timeFormat, ...rest }, DOM)
	return DOM
}
export default memo(
	withDefaultProps(FieldDateRange, {
		fromNow: false,
		timeFormat: "YYYY-MM-DD",
	})
)
