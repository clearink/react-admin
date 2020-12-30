import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
import withDefaultProps from "@/hocs/withDefaultProps"
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
function FieldFormNow(props: FieldDateProps) {
	return <FieldDate {...props} fromNow />
}

export default memo(withDefaultProps(FieldFormNow))
