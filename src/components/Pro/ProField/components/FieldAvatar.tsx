import React, { memo } from "react"
import { BaseProFieldProps } from "../type"
import { Avatar } from "antd"
import { AvatarProps } from "antd/lib/avatar"
import withDefaultProps from "@/hocs/withDefaultProps"

export interface FieldAvatarProps
	extends AvatarProps,
		BaseProFieldProps<FieldAvatarProps> {
	text?: AvatarProps["src"]
}
function FieldAvatar(props: FieldAvatarProps) {
	const { text, render, ...rest } = props
	const DOM = <Avatar {...rest} />
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}
export default memo(withDefaultProps(FieldAvatar, { text: "" }))
