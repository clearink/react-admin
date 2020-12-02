import { nanoid } from "@reduxjs/toolkit"

// 快速向配置文件添加属性
export function AddValue(key: string, value: any): any {
	return { [key]: value }
}
export function AddType(type: string): { type: string } {
	return AddValue("type", type) as any
}
/**   基础		 */
export function AddHidden(): { hidden: boolean } {
	return AddValue("hidden", true)
}
// 使该字段可选
export const AddOptional = AddValue("optional", true)

// name
export const AddName = (name: string): { name: string } =>
	AddValue("name", name) as any

export function AddInput(value?: any): { type: string; default: string } {
	return {
		...AddType("Input"),
		...AddValue("default", value),
	}
}

export function AddSelect(value: any) {
	return {
		...AddType("Select"),
		...AddValue("default", value),
	}
}
export function AddSwitch(value: any = false) {
	return {
		...AddType("Switch"),
		...AddValue("default", value),
	}
}
export function AddNumber(value?: number) {
	return {
		...AddType("InputNumber"),
		...AddValue("default", value),
	}
}

/**   高级		 */

// list 添加 id
export function AddList(value: any[] = []) {
	return {
		...AddType("List"),
		...AddValue(
			"default",
			value.map((item) => ({ id: nanoid(8), ...item }))
		),
	}
}

// 禁用
export function AddDisable(defaultValue: boolean = false) {
	return {
		disable: {
			...AddName("禁用"),
			...AddSwitch(defaultValue),
		},
	}
}
