import { FormItemProps } from "antd/lib/form"

export const antdFormItemProps: Array<keyof FormItemProps> = [
	"colon",
	"dependencies",
	"extra",
	"getValueFromEvent",
	"getValueProps",
	"hasFeedback",
	"help",
	"hidden",
	"htmlFor",
	"initialValue",
	"label",
	"labelAlign",
	"labelCol",
	"messageVariables",
	"name",
	"normalize",
	"noStyle",
	"preserve",
	"required",
	"rules",
	"shouldUpdate",
	"tooltip",
	"trigger",
	"validateFirst",
	"validateStatus",
	"validateTrigger",
	"valuePropName",
	"wrapperCol",
	"fieldKey",
	"isListField",
]

export const WIDTH_SIZE_ENUM = {
	// 适用于短数字，短文本或者选项
	xs: 104,
	// 适用于较短字段录入、如姓名、电话、ID 等。
	s: 216,
	// 标准宽度，适用于大部分字段长度。
	m: 328,
	// 适用于较长字段录入，如长网址、标签组、文件路径等。
	l: 440,
	// 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
	lg: 552,
	// 随便加的
	xl: 668,
}
