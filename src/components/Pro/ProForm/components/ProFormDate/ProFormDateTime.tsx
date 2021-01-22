import React from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import ProFormDate, { ProFormDateProps } from "."

function ProFormDateTime(props: ProFormDateProps) {
	return <ProFormDate {...props} />
}
export default withDefaultProps(ProFormDateTime, {
	showTime: true,
	placeholder: "请选择时间",
})
