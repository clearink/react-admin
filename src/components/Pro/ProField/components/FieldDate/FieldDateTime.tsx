import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
import withDefaultProps from "@/hocs/withDefaultProps"
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true

function FieldDateTime(props: FieldDateProps) {
	return <FieldDate {...props} />
}

export default memo(
	withDefaultProps(FieldDateTime, {
		timeFormat: "YYYY-DD-MM HH:mm:ss",
	})
)
