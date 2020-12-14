import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Badge, Checkbox, Select } from "antd"
import { ProFieldProps } from "./type"
import { enumText, enumToOption } from "../utils"

interface IProps extends ProFieldProps {
	text: string
	fieldProps: any
}

function FieldCheckbox(props: IProps, ref: Ref<any>) {
	console.log("function FieldCheckbox(props: IProps, ref: Ref<any>) {", props)
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldProps,
		fieldEnum,
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
		<Checkbox.Group
			defaultValue={text}
			options={options}
			{...rest}
			{...fieldProps}
		/>
	)
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldCheckbox), {
		text: "",
		mode: "read",
		fieldEnum: {},
	})
)
