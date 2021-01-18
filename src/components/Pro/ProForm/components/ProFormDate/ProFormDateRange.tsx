import React, { useMemo } from "react"
import { DatePicker } from "antd"
import moment, { isMoment } from "moment"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { RangePickerProps } from "antd/lib/date-picker"
import { isArray } from "@/utils/data/validate"

export type ProFormDateRangeProps = RangePickerProps & {
	render?: BaseProFieldProps<ProFormDateRangeProps>["render"]
	value?: RangePickerProps["value"]
}
function ProFormDateRange(props: ProFormDateRangeProps) {
	const { render, value, ...rest } = props

	const timeValue = useMemo(() => {
		if (!isArray(value)) return undefined
		return value.map((item) => (isMoment(item) ? item : moment(item)))
	}, [value]) as RangePickerProps["value"]

	const DOM = <DatePicker.RangePicker value={timeValue} {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormDateRangeProps>(ProFormDateRange, {})
