import { nanoid } from "@reduxjs/toolkit"

// 快速向配置文件添加属性
export function AddValue(key: string, value: any) {
	return { [key]: value }
}
export function AddType(type: string) {
	return AddValue("type", type)
}

export function AddHidden() {
	return AddValue("hidden", true)
}
// 使该字段可选
export const AddOptional = AddValue("optional", true)

// name
export const AddName = (name: string) => AddValue("name", name)
export function AddInput(value?: any) {
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

export function AddList(value: any[] = []) {
	return {
		...AddType("List"),
		...AddValue(
			"default",
			value.map((item) => ({ id: nanoid(8), ...item }))
		),
	}
}
