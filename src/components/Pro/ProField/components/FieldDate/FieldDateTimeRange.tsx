import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import FieldDateRange, { FieldDateRangeProps } from "./FieldDateRange"

// 仅仅向 FieldDateTimeRange 增加了一个属性 showTime = true
type FieldDateTimeRangeProps = Omit<FieldDateRangeProps, "showTime"> & {}
function FieldDateTimeRange(props: FieldDateTimeRangeProps) {
	return <FieldDateRange {...props} showTime />
}
export default memo(
	withDefaultProps(FieldDateTimeRange, {
		timeFormat: "YYYY-MM-DD HH:mm:ss",
	})
)
