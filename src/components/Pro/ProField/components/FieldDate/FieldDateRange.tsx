import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker } from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import { isArray } from "@/utils/validate"
import moment, { Moment } from "moment"
import { BaseProFieldProps } from "../../type"
import { momentToText } from "./utils"

// 日期相关
// 最基本的 date
export type FieldDateRangeProps = Omit<RangePickerProps, "mode"> &
	Pick<BaseProFieldProps, "mode" | "render" | "renderFormItem"> & {
		value?: RangePickerProps["value"] | [string | number, string | number]
		timeFormat?: string
		fromNow?: boolean
	}
function FieldDateRange(props: FieldDateRangeProps) {
	const {
		value,
		mode,
		render,
		renderFormItem,
		timeFormat,
		picker,
		fromNow, // 是否是根据当前时间算的
		...rest
	} = props
	const timeValue = useMemo(() => {
		if (!isArray(value)) return [undefined, undefined] // 不是数组 给默认值
		return value.map((item) => moment(item))
	}, [value])
	if (mode === "read") {
		const dom = momentToText(timeValue as any, fromNow, timeFormat)
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	// picker 属性有问题 只能先用any
	const formItemDom = (
		<DatePicker.RangePicker
			value={timeValue as RangePickerProps["value"]}
			picker={picker as any}
			{...rest}
		/>
	)
	if (renderFormItem)
		return renderFormItem(value, { mode, ...rest }, formItemDom)
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
