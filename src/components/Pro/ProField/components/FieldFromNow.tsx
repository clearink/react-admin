import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { DatePicker, Tooltip } from "antd"
import { ProFieldProps } from "./type"
import moment from "moment"

interface IProps extends ProFieldProps {
	text: string
	showTime: boolean
	timeFormat: string
	// picker: "date" | "week" | "month" | "quarter" | "year"
}

// 时间相关
function FieldFromNow(props: IProps, ref: Ref<any>) {
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
		const dom = (
			<Tooltip title={timeValue.format(timeFormat)}>
				<span>{timeValue.fromNow(true)}</span>
			</Tooltip>
		)
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDom = <DatePicker placeholder='请选择' {...rest} {...fieldProps} />
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldFromNow), {
		text: "",
		mode: "read",
		showTime: false,
		timeFormat: "YYYY-MM-DD HH:mm:ss",
		fieldEnum: {},
	})
)
