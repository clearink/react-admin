import withDefaultProps from "@/hocs/withDefaultProps"
import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
export type FieldDateTimeProps = Omit<FieldDateProps, "showTime" | "fromNow">
function FieldDateTime(props: FieldDateTimeProps) {
	return <FieldDate {...props} showTime />
}

export default memo(
	withDefaultProps(FieldDateTime, {
		timeFormat: "YYYY-MM-DD HH:mm:ss",
		style: { width: 450 },
	})
)
