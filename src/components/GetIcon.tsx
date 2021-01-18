// 根据icon字段尝试匹配icon
import React, { cloneElement } from "react"
import IconFont from "./IconFont"

// 期望返回一个DOM 可以接受className style
interface GetIconProps {
	icon: any
	className?: string
	style?: React.CSSProperties
}
export default function GetIcon(props: GetIconProps) {
	const { icon, ...rest } = props
	if (typeof icon === "string") {
		// iconFont 默认以icon为开头
		// 尝试使用 iconfont
		if (icon.startsWith("icon")) return <IconFont type={icon} {...rest} />
		return icon
	}
	// 如果是reactElement
	// 添加 className 和 style
	if (React.isValidElement(icon))
		return cloneElement(icon, {
			...rest,
		})
	return icon
}
