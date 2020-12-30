import React, { ReactNode, useEffect, useState } from "react"
import { Input } from "antd"
import { BaseProFieldProps } from "../../type"
import { PasswordProps } from "antd/lib/input"
import { renderHiddenMark } from "./utils"
import withProField from "@/components/Pro/hocs/withProField"

interface FieldPasswordProps extends BaseProFieldProps {
	formItemProps?: PasswordProps
	text: string
	visible?: boolean
	hiddenMark: ReactNode
}
const defaultFormItemProps: PasswordProps = {
	placeholder: "请输入密码",
	allowClear: true,
}
function FieldPassword(props: FieldPasswordProps) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		hiddenMark,
		visible,
		formItemProps,
		...rest
	} = props

	const [showPwd, setShowPwd] = useState(() => !!visible)
	useEffect(() => {
		setShowPwd(!!visible)
	}, [visible])

	if (mode === "read") {
		const dom = renderHiddenMark(text, hiddenMark, showPwd, setShowPwd)
		if (render) return render(text, { mode, ...rest, visible, hiddenMark }, dom)
		return dom
	}
	const editProps = { ...defaultFormItemProps, ...formItemProps }
	const formItemDom = <Input.Password {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...editProps }, formItemDom)
	return formItemDom
}

export default withProField(FieldPassword, {
	text: "-",
	hiddenMark: "*",
	visible: false,
})
