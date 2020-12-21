import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 showTime = true
export type FieldFormNowProps = Omit<FieldDateProps, "showTime"> & {}
function FieldFormNow(props: FieldFormNowProps) {
	return <FieldDate {...props} fromNow />
}

export default memo(FieldFormNow)
