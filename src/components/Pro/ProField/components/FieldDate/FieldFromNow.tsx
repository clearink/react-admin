import React from "react"
import withProField from "@/components/Pro/hocs/withProField"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
export type FieldFormNowProps = FieldDateProps
function FieldFormNow(props: FieldFormNowProps) {
	return <FieldDate {...props} fromNow />
}

export default withProField(FieldFormNow)
