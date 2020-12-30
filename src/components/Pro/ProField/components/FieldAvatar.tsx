import React from "react"
import { BaseProFieldProps } from "../type"
import { Avatar, Upload } from "antd"
import { AvatarProps } from "antd/lib/avatar"
import withProField from "../../hocs/withProField"
import { UploadProps } from "antd/lib/upload"

export interface FieldAvatarProps extends BaseProFieldProps, AvatarProps {
	formItemProps?: UploadProps
	text: string
}
const defaultForItemProps: UploadProps = {}
function FieldAvatar(props: FieldAvatarProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props
	const dom = <Avatar src={text} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}

	const editProps = { ...defaultForItemProps, ...formItemProps }
	const formItemDom = <Upload {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...formItemProps }, formItemDom)
	return formItemDom
}
export default withProField(FieldAvatar, {
	text: "",
})
