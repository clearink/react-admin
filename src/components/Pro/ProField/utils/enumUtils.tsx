import { isArray, isObject } from "@/utils/validate"
import { Badge, Space, Tag } from "antd"
import React from "react"
import { FieldEnumProps, FieldOptionType } from "../type"
// 主要用于将 select checkbox radio 等具有 enum 的组件 text 映射 成文字

// status color array
export const statusArray: FieldEnumProps[] = [
	"success",
	"processing",
	"error",
	"warning",
	"default",
].map((item) => ({ status: item as any }))
export const colorArray: FieldEnumProps[] = [
	"orange",
	"blue",
	"green",
	"lime",
	"red",
	"cyan",
	"purple",
	"geekblue",
	"yellow",
	"magenta",
	"volcano",
	"gold",
	"pink",
].map((item) => ({ color: item }))
/* ************************************************************************* */

/**
 * 1. 从 options 中 拿到自己的 index
 * 2. 匹配相同 index 中的 fieldEnum
 * 3. 渲染组件
 * 4. badge 切换成 badge 组件
 */
export function renderStatusFromOption(
	value: string | number | Array<string | number>,
	options: Array<{ label: string; value: any }>,
	fieldEnum?: FieldEnumProps[],
	textTag = false // tag 自带右边距
) {
	// 递归
	if (isArray(value))
		return (
			<Space size={textTag ? 0 : 8}>
				{value.map((item) =>
					renderStatusFromOption(item, options, fieldEnum, textTag)
				)}
			</Space>
		)

	const textIndex = options.findIndex((item) => `${item.value}` === `${value}`)
	let enumValue = null
	let optionValue = null
	if (fieldEnum && textIndex !== -1) {
		// 找到了 就去匹配
		enumValue = fieldEnum[textIndex] ?? fieldEnum[fieldEnum.length - 1]
		optionValue = options[textIndex]
	}
	if (textTag) {
		return (
			<Tag color={enumValue?.color ?? enumValue?.status} key={value}>
				{optionValue?.value}
			</Tag>
		)
	}
	return (
		<Badge
			key={value}
			text={optionValue?.label}
			status={enumValue?.status}
			color={enumValue?.color}
		/>
	)
}

/**
 * 转换原始的options
 * options : string[] | Array<{ label: string; value: string }>
 */
export function renderOriginOptions(
	originOption: string[] | Array<FieldOptionType>
) {
	if (!isArray(originOption) || originOption.length === 0) return []
	if (isObject(originOption[0])) return originOption
	return (originOption as string[]).map((item) => ({
		label: item,
		value: item,
	}))
}
