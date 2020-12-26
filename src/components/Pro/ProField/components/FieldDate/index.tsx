import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker } from "antd"
import { DatePickerProps } from "antd/lib/date-picker"
import { isObject } from "@/utils/validate"
import moment, { Moment } from "moment"
import { BaseProFieldProps } from "../../type"

// 日期相关
// 最基本的 date
export type FieldDateProps = Omit<DatePickerProps, "mode"> &
	Pick<BaseProFieldProps, "mode" | "render" | "renderFormItem"> & {
		value?: Moment | string | number
		timeFormat?: string
		fromNow?: boolean
	}
function FieldDate(props: FieldDateProps) {
	const {
		value,
		mode,
		render,
		renderFormItem,
		timeFormat,
		fromNow, // 是否是根据当前时间算的
		...rest
	} = props

	const timeValue = useMemo(() => {
		if (moment.isMoment(value)) return value
		return moment(value)
	}, [value])

	if (mode === "read") {
		const dom = (
			<span>
				{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}
			</span>
		)
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	// picker 属性有问题 只能先用any
	const formItemDom = <DatePicker {...rest} picker={rest.picker as any} />
	if (renderFormItem)
		return renderFormItem(value, { mode, ...rest }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldDate, {
		mode: "read",
		fromNow: false,
		picker: "date",
		timeFormat: "YYYY-MM-DD",
		showTime: false,
		placeholder: "请选择",
		style: { width: 280 },
	})
)
