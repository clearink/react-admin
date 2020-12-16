import React from "react"
import { Badge, Space } from "antd"
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

export function enumText(
	value: string | number | Array<string | number>,
	fieldEnum: BaseProFieldProps["fieldEnum"]
) {
	if (Array.isArray(value))
		return <Space>{value.map((item) => enumText(item, fieldEnum))}</Space>
	if (!fieldEnum) return value
	return <Badge key={value} {...(fieldEnum[`${value}`] ?? {})} />
}
