import React from "react"
import withProField from "@/components/Pro/hocs/withProField"
import { DatePickerProps } from "antd/lib/date-picker"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
export type FieldDateTimeProps = FieldDateProps
const defaultFormItemProps: DatePickerProps = {
	style: { width: 450 },
	picker: "date",
	showTime: true,
}

function FieldDateTime(props: FieldDateTimeProps) {
	return <FieldDate {...props} />
}

export default withProField(FieldDateTime, {
	formItemProps: defaultFormItemProps,
})
