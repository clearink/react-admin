import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker } from "antd"
import { ProFieldProps } from "./type"
import moment from "moment"

interface IProps extends ProFieldProps {
	text: string
	timeFormat: string
	showTime: boolean
	// picker: "date" | "week" | "month" | "quarter" | "year"
}

// 时间相关
function FieldDate(props: IProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldProps,
		fieldEnum,
		showTime,
		timeFormat,
		...rest
	} = props
	const timeValue = useMemo(() => moment(text), [text])
	if (mode === "read") {
		const dom = <span>{timeValue.format(timeFormat)}</span>
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDom = (
		<DatePicker
			placeholder='请选择'
			showTime={showTime}
			{...rest}
			{...fieldProps}
		/>
	)
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldDate), {
		text: "",
		mode: "read",
		showTime: false,
		timeFormat: "YYYY-MM-DD HH:mm:ss",
		fieldEnum: {},
	})
)
