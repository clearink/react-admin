import React from "react"
import { DatePicker } from "antd"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { RangePickerProps } from "antd/lib/date-picker"

export type ProFormDateRangeProps = RangePickerProps & {
	render?: BaseProFieldProps<ProFormDateRangeProps>["render"]
	value?: RangePickerProps["value"]
}
function ProFormDateRange(props: ProFormDateRangeProps) {
	const { render, ...rest } = props
	const DOM = <DatePicker.RangePicker showNow />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormDateRangeProps>(ProFormDateRange, {
	allowClear: true,
})
