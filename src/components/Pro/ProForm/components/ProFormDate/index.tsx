import React from "react"
import { DatePicker } from "antd"
import { Moment } from "moment"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { DatePickerProps } from "antd/lib/date-picker"
import { PickerPanelDateProps } from "antd/lib/calendar/generateCalendar"

export type ProFormDateProps = DatePickerProps &
	PickerPanelDateProps<Moment> & {
		render?: BaseProFieldProps<ProFormDateProps>["render"]
		value?: DatePickerProps["value"]
	}
function ProFormDate(props: ProFormDateProps) {
	const { render, ...rest } = props
	const DOM = <DatePicker {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormDateProps>(ProFormDate, {
	allowClear: true,
	placeholder: "请输入",
})
