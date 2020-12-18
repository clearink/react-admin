import { isArray } from "@/utils/validate"
import { Badge, Space, Tag } from "antd"
import React from "react"
import { FieldEnumProps } from "../type"
// 主要用于将 select checkbox radio 等具有 enum 的组件 text 映射 成文字

// status color array
export const statusArray = [
	"success",
	"processing",
	"error",
	"warning",
	"default",
]
export const colorArray = [
	"pink",
	"red",
	"yellow",
	"orange",
	"cyan",
	"green",
	"blue",
	"purple",
	"geekblue",
	"magenta",
	"volcano",
	"gold",
	"lime",
]
// enum is array
export function renderStatusFromOption(
	text: string | number | Array<string | number>,
	fieldEnum?: FieldEnumProps[]
) {
	if (!fieldEnum) return []
	if (isArray(text))
		return (
			<Space>{text.map((item) => renderStatusFromOption(item, fieldEnum))}</Space>
		)
	const enumValue = fieldEnum.find((item) => `${item.text}` === `${text}`)
	console.log(`export function renderStatusFromEnum(`, text, fieldEnum)
	if (enumValue) {
		const { badge, ...rest } = enumValue
		if (badge) return <Badge {...rest} key={text} />
		return (
			<Tag color={rest.color} key={text}>
				{text}
			</Tag>
		)
	}
	return <Tag title={`${text}`} key={text} />
}

// enum 可以当作最基本的 options
// 仅仅当enum 是 statusArray 时,
export function renderOptionFromEnum(fieldEnum?: FieldEnumProps[]) {
	if (!isArray(fieldEnum)) return []
	return fieldEnum.map((item) => ({
		label: item.text,
		value: item.status,
	}))
}
/**
 * 	text?: string | number
	status?: "success" | "processing" | "error" | "default" | "warning"
	color?: string
	badge?: boolean // 
 */
