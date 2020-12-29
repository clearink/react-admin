import { isArray, isObject } from "@/utils/validate"
import { Badge, Space, Tag } from "antd"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import React from "react"
import { FieldOptionType } from "../ProField/type"
// 主要用于将 select checkbox radio 等具有 enum 的组件 text 映射 成文字

export const colorArray = [
	"blue",
	"green",
	"orange",
	"volcano",
	"magenta",
	"lime",
	"red",
	"geekblue",
	"cyan",
	"gold",
	"purple",
	"yellow",
	"pink",
]
/* ************************************************************************* */

/**
 * 1. 从 options 中 拿到自己的 index
 * 2. 匹配相同 index 中的 fieldEnum
 * 3. 渲染组件
 * 4. badge 切换成 badge 组件
 */
export function renderStatusFromOption(
	value: CheckboxValueType[] | string | number | boolean | undefined,
	options: Array<{ label: string; value: any }>,
	fieldEnum?: string[],
	showTag = false // tag 自带右边距
) {
	// 递归
	if (isArray(value))
		return (
			<Space size={showTag ? 0 : 8}>
				{value.map((item) =>
					renderStatusFromOption(item, options, fieldEnum, showTag)
				)}
			</Space>
		)
	if (!isArray(options)) return null
	const textIndex = options.findIndex((item) => `${item.value}` === `${value}`)
	let color
	let optionValue = value
	if (textIndex !== -1) {
		// 找到了 就去匹配
		if (fieldEnum)
			color = fieldEnum[textIndex] ?? fieldEnum[fieldEnum.length - 1]
		optionValue = options[textIndex].label
	}
	if (showTag) {
		return (
			<Tag color={color} key={`${value}`}>
				{optionValue}
			</Tag>
		)
	}
	return <Badge key={`${value}`} text={optionValue} color={color} />
}

/**
 * 转换原始的options
 * options : string[] | Array<{ label: string; value: string }>
 */
export function renderOriginOptions(
	originOption: string[] | Array<FieldOptionType>
) {
	if (isObject(originOption[0])) return originOption
	if (!isArray(originOption)) return []
	return (originOption as string[]).map((item) => ({
		label: item,
		value: item,
	}))
}
