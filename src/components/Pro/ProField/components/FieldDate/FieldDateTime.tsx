import React from "react"
import withProField from "@/components/Pro/hocs/withProField"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
export type FieldDateTimeProps = FieldDateProps
const defaultFormItemProps = {
	style: { width: 450 },
	picker: "date" as any,
	showTime: true,
}

function FieldDateTime(props: FieldDateTimeProps) {
	const formItemProps = { ...props.formItemProps, ...defaultFormItemProps }
	return <FieldDate {...props} formItemProps={formItemProps} />
}

export default withProField(FieldDateTime)
