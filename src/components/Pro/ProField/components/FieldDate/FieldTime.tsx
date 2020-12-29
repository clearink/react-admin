import withProField from "@/components/Pro/hocs/withProField"
import { DatePickerProps } from "antd/lib/date-picker"
import React from "react"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 picker='time'
const defaultFormItemProps: DatePickerProps = {
	style: { width: 170 },
	picker: "date",
	showTime: true,
}

export type FieldTimeProps = FieldDateProps & {}
function FieldTime(props: FieldTimeProps) {
	return <FieldDate {...props} />
}

export default withProField(FieldTime, {
	formItemProps: defaultFormItemProps,
})
