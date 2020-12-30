import React from "react"
import FieldDateRange, { FieldDateRangeProps } from "./FieldDateRange"
import withProField from "@/components/Pro/hocs/withProField"
// 仅仅向 FieldDateTimeRange 增加了一个属性 showTime = true
export type FieldDateTimeRangeProps = FieldDateRangeProps

const defaultFormItemProps = {
	style: { width: 450 },
	picker: "date" as any,
	showTime: true,
}
function FieldDateTimeRange(props: FieldDateTimeRangeProps) {
	const formItemProps = { ...props.formItemProps, ...defaultFormItemProps }
	return <FieldDateRange {...props} formItemProps={formItemProps} />
}
export default withProField(FieldDateTimeRange, {
	timeFormat: "YYYY-MM-DD HH:mm:ss",
})
