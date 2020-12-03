import { nanoid } from "@reduxjs/toolkit"

// 快速向配置文件添加属性
export function AddValue(key: string, value: any): Parameters<> {
	return { [key]: value }
}

export function AddDefault<T extends any>(value: T): { default: T } {
	return AddValue("default", value)
}
export function AddType(type: string): { type: string } {
	return AddValue("type", type) as any
}
/**   基础		 */
export function AddHidden(): { hidden: boolean } {
	return AddValue("hidden", true)
}
// 使该字段可选
export const AddOptional: { optional: boolean } = AddValue("optional", true)

// name
export const AddName = (name: string): { name: string } =>
	AddValue("name", name) as any

export function AddInput(value?: any) {
	return {
		...AddType("Input"),
		...AddDefault(value),
	}
}

export function AddSelect(value: any) {
	return {
		...AddType("Select"),
		...AddDefault(value),
	}
}
export function AddSwitch(value: boolean = false) {
	return {
		...AddType("Switch"),
		...AddDefault(value),
	}
}
export function AddNumber(value?: number) {
	return {
		...AddType("InputNumber"),
		...AddDefault(value),
	}
}

export function AddColor(value?: string) {
	return {
		...AddType("Color"),
		...AddDefault(value),
	}
}

/**   高级		 */

// list 添加 id
export function AddList(value: any[] = []): { type: string; default: string } {
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
