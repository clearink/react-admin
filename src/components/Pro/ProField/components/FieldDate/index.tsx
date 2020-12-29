import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker } from "antd"
import { DatePickerProps } from "antd/lib/date-picker"
import moment, { Moment } from "moment"
import { BaseProFieldProps } from "../../type"
import withProField from "@/components/Pro/hocs/withProField"

// 日期相关
// 最基本的 date
export type FieldDateProps = BaseProFieldProps & {
	text?: Moment | string | number
	formItemProps?: DatePickerProps
	timeFormat?: string
	fromNow?: boolean
}
const defaultFormItemProps: DatePickerProps = {
	picker: "date",
	showTime: false,
	placeholder: "请选择",
	style: { width: 280 },
}
function FieldDate(props: FieldDateProps) {
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
		if (moment.isMoment(text)) return text
		return moment(text)
	}, [text])

	if (mode === "read") {
		const dom = (
			<span>
				{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}
			</span>
		)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// picker 属性有问题 只能先用any
	const formItemDom = (
		<DatePicker {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps },
			formItemDom
		)
	return formItemDom
}
export default withProField(FieldDate, {
	fromNow: false,
	timeFormat: "YYYY-MM-DD",
	formItemProps: defaultFormItemProps,
})
