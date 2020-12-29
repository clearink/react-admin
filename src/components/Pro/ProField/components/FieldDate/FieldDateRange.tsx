import React, { useMemo } from "react"
import { DatePicker } from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import { isArray } from "@/utils/validate"
import moment from "moment"
import { BaseProFieldProps } from "../../type"
import { momentToText } from "./utils"
import withProField from "@/components/Pro/hocs/withProField"

// 日期相关
// 最基本的 date
export type FieldDateRangeProps = BaseProFieldProps & {
	text?: RangePickerProps["value"] | [string | number, string | number]
	timeFormat?: string
	fromNow?: boolean
	formItemProps?: RangePickerProps
}
const defaultFormItemProps: RangePickerProps = {
	picker: "date",
	format: "YYYY-MM-DD",
	showTime: false,
	style: { width: 280 },
}
function FieldDateRange(props: FieldDateRangeProps) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		timeFormat,
		fromNow, // 是否是根据当前时间算的
		formItemProps,
		...rest
	} = props
	const timeValue = useMemo(() => {
		if (!isArray(text)) return [undefined, undefined] // 不是数组 给默认值
		return text.map((item) => moment(item))
	}, [text])
	if (mode === "read") {
		const dom = momentToText(timeValue as any, fromNow, timeFormat)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}

	const formItemDom = (
		<DatePicker.RangePicker
			{...defaultFormItemProps}
			{...rest}
			{...formItemProps}
		/>
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps },
			formItemDom
		)
	return formItemDom
}
export default withProField(FieldDateRange, {
	fromNow: false,
	timeFormat: "YYYY-MM-DD",
	formItemProps: defaultFormItemProps,
})
