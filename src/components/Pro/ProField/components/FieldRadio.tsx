import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Radio } from "antd"
import { ProFieldProps } from "./type"
import { enumText, enumToOption } from "../utils"

interface IProps extends ProFieldProps {
	text: string
	optionType: "default" | "button"
	fieldProps: any
}

function FieldRadio(props: IProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldProps,
		fieldEnum,
		optionType,
		...rest
	} = props
	const dom = useMemo(() => <span>{enumText(text, fieldEnum ?? {})}</span>, [
		text,
		fieldEnum,
	])
	const options = useMemo(() => {
		return enumToOption(fieldEnum ?? {})
	}, [fieldEnum])
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDom = (
		<Radio.Group
			defaultValue={text}
			options={options}
			optionType={optionType}
			{...rest}
			{...fieldProps}
		/>
	)
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldRadio), {
		text: "",
		optionType: "default",
		mode: "read",
		fieldEnum: {},
	})
)
