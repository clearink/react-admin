import React from "react"
import { Badge, Space, Tag } from "antd"
import { BaseProFieldProps } from "../../type"

export function enumToOption(
	value: BaseProFieldProps["fieldEnum"]
): { key?: string; label: any; value: any }[] {
	return Object.values(value ?? {}).map((item) => ({
		key: item.text,
		label: item.text,
		value: item.status,
	}))
}
// 可以支持 Badge 和 Tag
export function enumText(
	value: string | number | Array<string | number>,
	fieldEnum: BaseProFieldProps["fieldEnum"]
) {
	if (Array.isArray(value))
		return <Space>{value.map((item) => enumText(item, fieldEnum))}</Space>
	if (!fieldEnum) return value
	const result = fieldEnum[`${value}`] ?? {}
	if (result.tag) return <Tag key={value} color={result.color} icon={result.icon}>{result.text}</Tag>
	return <Badge key={value} {...result} />
}
