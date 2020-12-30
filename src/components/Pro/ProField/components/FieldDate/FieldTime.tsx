import withProField from "@/components/Pro/hocs/withProField"
import React from "react"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 picker='time'
const defaultFormItemProps  = {
	style: { width: 170 },
	picker: "date" as any,
	showTime: true,
}

export type FieldTimeProps = FieldDateProps & {}
function FieldTime(props: FieldTimeProps) {
	const formItemProps = { ...props.formItemProps, ...defaultFormItemProps }
	return <FieldDate {...props} formItemProps={formItemProps} />
}

export default withProField(FieldTime)
