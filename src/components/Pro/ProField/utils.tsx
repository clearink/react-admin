import React from "react"
import { isMap, isUndefined } from "@/utils/validate"
import { ProFieldEnum, ProFieldEnumType } from "./components/type"
import { Badge, Space } from "antd"

const proFieldProps = `valueType request plain renderFormItem render text formItemProps valueEnum`

const proFormProps = `fieldProps isDefaultDom groupProps contentRender submitterProps submitter`

const propList = `${proFieldProps} ${proFormProps}`.split(/[\s\n]+/)

export function pickProFieldProps(props: object) {
	const attrs = {}
	Object.keys(props || {}).forEach((key) => {
		if (!propList.includes(key)) attrs[key] = props[key]
	})
	return attrs
}

// 过滤 undefined
export function OmitUndefined<T extends Object>(obj: T) {
	const result = {} as T
	for (let [k, v] of Object.entries(obj)) {
		if (!isUndefined(v)) result[k] = v
	}
	return result
}

// 格式化数字

export function formatNumber(num: number) {
	return new Intl.NumberFormat().format(num)
}

// 格式化秒
export function formatSecond(num: number) {
	let str = ""
	const hour = Math.floor(num / 3600)
	const minute = Math.floor((num / 60) % 60)
	const second = Math.floor(num % 60)
	str = `${second}秒`
	if (minute) str = `${minute}分钟${str}`
	if (hour) str = `${hour}小时${str}`
	return str
}

// object to map
type EnumMap = Map<any, ProFieldEnumType>
export function objectToMap(value: any): EnumMap {
	if (isMap(value)) return value as EnumMap
	return new Map(Object.entries(value ?? {}))
}

// 转化 fieldEnum 为 options
type EnumOption = {
	key?: string
	label: any
	value: any
}
export function enumToOption(value: ProFieldEnum): EnumOption[] {
	return Object.values(value ?? {}).map((item) => ({
		key: item.text as string,
		label: item.text,
		value: item.status,
	}))
}

export function enumText(
	value: string | number | Array<string | number>,
	fieldEnum: ProFieldEnum
) {
	if (Array.isArray(value))
		return <Space>{value.map((item) => enumText(item, fieldEnum))}</Space>
	const filedEnumMap = objectToMap(fieldEnum)
	if (!filedEnumMap.has(`${value}`)) return value
	const result = filedEnumMap.get(`${value}`)
	if (!result) return value
	return <Badge {...result} />
}
