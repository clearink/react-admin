import React from "react"
import { DatePicker } from "antd"
import { Moment } from "moment"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { DatePickerProps } from "antd/lib/date-picker"
import { PickerPanelDateProps } from "antd/lib/calendar/generateCalendar"

export type ProFormTimeProps = DatePickerProps &
	PickerPanelDateProps<Moment> & {
		render?: BaseProFieldProps<ProFormTimeProps>["render"]
		value?: DatePickerProps["value"]
	}
function ProFormDate(props: ProFormTimeProps) {
	const { render, ...rest } = props
	const DOM = <DatePicker.TimePicker {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormTimeProps>(ProFormDate, {
	placeholder: "请输入",
})
