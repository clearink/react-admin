import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker } from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import { isArray, isObject } from "@/utils/validate"
import moment, { Moment } from "moment"
import { BaseProFieldProps } from "../../type"
import { momentToText } from "./utils"

// 日期相关
// 最基本的 date
export type FieldDateRangeProps = Omit<RangePickerProps, "mode"> &
	Pick<BaseProFieldProps, "mode" | "render" | "renderFormItem"> & {
		text: [Moment, Moment] | [string | number, string | number]
		timeFormat?: string
		fromNow?: boolean
	}
function FieldDateRange(props: FieldDateRangeProps) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		timeFormat,
		picker,
		fromNow, // 是否是根据当前时间算的
		...rest
	} = props
	const timeValue = useMemo(() => {
		if (!isArray(text)) return [moment.now(), moment.now()] // 不是数组 给过默认值
		if (
			(text as any[]).every((item) => isObject(item) && item instanceof moment)
		)
			return text
		return (text as any[]).map((item) => moment(item))
	}, [text])
	if (mode === "read") {
		const dom = momentToText(timeValue, fromNow, timeFormat)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// picker 属性有问题 只能先用any
	const formItemDom = (
		<DatePicker.RangePicker picker={picker as any} {...rest} />
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldDateRange, {
		mode: "read",
		fromNow: false,
		picker: "date",
		timeFormat: "YYYY-MM-DD",
		showTime: false,
		style: { width: 280 },
	})
)
