import { FormItemProps } from "antd/lib/form"
export function getRequiredRule(name: string) {
	return [
		{ required: true, message: `请输入${name}` },
	] as FormItemProps["rules"]
}
