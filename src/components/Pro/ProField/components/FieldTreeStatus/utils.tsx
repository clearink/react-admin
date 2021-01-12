import { isArray, isObject } from "@/utils/validate"
import { Badge, Space, Tag } from "antd"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import React from "react"
import { FieldOptionType } from "../../type"
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
 * 2. 匹配相同 index 中的 statusList
 * 3. 渲染组件
 * 4. badge 切换成 badge 组件
 */
export function renderStatus(
	value: CheckboxValueType[] | string | number | boolean | undefined,
	options: Array<{ label: string; value: any }>,
	statusList?: string[],
	type: "tag" | "badge" = "tag" // tag 自带右边距
) {
	// 递归
	const isTag = type === "tag"
	if (isArray(value))
		return (
			<Space size={isTag ? 0 : 8}>
				{value.map((item) => renderStatus(item, options, statusList, type))}
			</Space>
		)
	if (!isArray(options)) return null
	const textIndex = options.findIndex((item) => `${item.value}` === `${value}`)
	let color
	let optionValue = value
	if (textIndex !== -1) {
		// 找到了 就去匹配
		if (statusList)
			color = statusList[textIndex] ?? statusList[statusList.length - 1]
		optionValue = options[textIndex].label
	}
	if (isTag) {
		return (
			<Tag color={color} key={`${value}`}>
				{optionValue}
			</Tag>
		)
	}
	return <Badge key={`${value}`} text={optionValue} color={color} />
}

export function renderTreeStatus(){
	
}