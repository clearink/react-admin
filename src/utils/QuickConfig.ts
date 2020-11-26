// 快速向配置文件添加属性
export function AddValue(key: string, value: any) {
	return { [key]: value }
}
export function AddType(type: string) {
	return AddValue("type", type)
}

export function AddInput(value: any = "") {
	return {
		...AddType("Input"),
		...AddValue("default", value),
	}
}

export function AddSelect(value: any = "") {
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

export function AddList(value: any[] = []) {
	return {
		...AddType("List"),
		...AddValue("default", value),
	}
}
