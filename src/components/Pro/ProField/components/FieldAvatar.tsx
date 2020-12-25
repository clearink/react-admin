import React, { memo } from "react"
import { BaseProFieldProps } from "../type"
import { Avatar, Upload } from "antd"
import withDefaultProps from "@/hocs/withDefaultProps"
import { AvatarProps } from "antd/lib/avatar"

export interface FieldAvatarProps extends BaseProFieldProps, AvatarProps {}

function FieldAvatar(props: FieldAvatarProps) {
	const { mode, render, renderFormItem, text, ...rest } = props
	console.log('propssssssssssssssssssssssssssssssssssss',props);
	const dom = <Avatar src={text} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// TODO
	// 将children 设置为 trigger
	const formItemDom = <Upload />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldAvatar, {
		mode: "read",
	})
)
