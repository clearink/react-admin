import { Rule } from "antd/lib/form"
/** 生成一些 antd form item rules */
export function getRequiredRule(name: string) {
	return [{ required: true, message: `请输入${name}` }] as Rule[]
}
