import withDefaultProps from "@/hocs/withDefaultProps"
import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
// 仅仅是向 FieldDat 添加了一个默认值 picker='time'
type FieldTimeProps = Omit<FieldDateProps, "showTime" | "fromNow"> & {}
function FieldTime(props: FieldTimeProps) {
	return <FieldDate {...props} picker='time' />
}

export default memo(
	withDefaultProps(FieldTime, {
		style: { width: 170 },
	})
)
