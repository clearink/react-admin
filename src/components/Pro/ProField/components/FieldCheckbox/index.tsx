import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../../utils"

export interface FieldCheckboxProps
	extends BaseProFieldProps,
		CheckboxGroupProps {
	options?: string[] | Array<FieldOptionType>
	/** 使用 tag 渲染文本 */
	showTag: boolean
}

function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		fetchUrl, // 请求
		transform, // 转换
		showTag,
		...rest
	} = props

	const { data } = useFetchData("get",fetchUrl) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return []
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		const dom = (
			<span>
				{renderStatusFromOption(
					rest?.value ?? text,
					options,
					fieldEnum,
					showTag
				)}
			</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Checkbox.Group options={options} {...rest} />
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldCheckbox), {
		text: "",
		mode: "read",
		showTag: true,
	})
)
