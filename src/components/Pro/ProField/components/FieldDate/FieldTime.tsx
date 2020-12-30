import React, { memo } from "react"
import FieldDate, { FieldDateProps } from "."
import withDefaultProps from "@/hocs/withDefaultProps"

function FieldTime(props: FieldDateProps) {
	return <FieldDate {...props} />
}

export default memo(
	withDefaultProps(FieldTime, {
		fromNow: false,
		timeFormat: "YYYY-MM-DD HH:mm:ss",
	})
)
