import React, { useMemo } from "react"
import { DatePicker } from "antd"
import moment, { isMoment, Moment } from "moment"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { DatePickerProps } from "antd/lib/date-picker"
import { PickerPanelDateProps } from "antd/lib/calendar/generateCalendar"

export type ProFormDateProps = DatePickerProps &
	PickerPanelDateProps<Moment> & {
		render?: BaseProFieldProps<ProFormDateProps>["render"]
		value?: DatePickerProps["value"] | string | number
	}
function ProFormDate(props: ProFormDateProps) {
	const { render, value, ...rest } = props
	const timeValue = useMemo(() => {
		if (!value) return undefined
		if (isMoment(value)) return value
		return moment(value)
	}, [value])
	const DOM = <DatePicker value={timeValue} {...rest} />
	if (render) return render({ ...rest, value: timeValue }, DOM)
	return DOM
}
export default withFormItem<ProFormDateProps>(ProFormDate, {
	placeholder: "请选择日期",
})
