import React from "react"
import FieldDateRange, { FieldDateRangeProps } from "./FieldDateRange"
import withProField from "@/components/Pro/hocs/withProField"
import { RangePickerProps } from "antd/lib/date-picker"
// 仅仅向 FieldDateTimeRange 增加了一个属性 showTime = true
export type FieldDateTimeRangeProps = FieldDateRangeProps

const defaultFormItemProps: RangePickerProps = {
	style: { width: 450 },
	picker: "date",
	showTime: true,
}
function FieldDateTimeRange(props: FieldDateTimeRangeProps) {
	return <FieldDateRange {...props} />
}
export default withProField(FieldDateTimeRange, {
	timeFormat: "YYYY-MM-DD HH:mm:ss",
	formItemProps: defaultFormItemProps,
})
