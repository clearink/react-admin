import ConfigDefault from "../ConfigDefault"

class InputConfig extends ConfigDefault {
	title = {
		name: "标签",
		type: "Input",
		default: "标签",
	}

	placeholder = {
		name: "占位符",
		type: "Input",
		default: "占位符",
	}

	type = {
		name: "类型",
		type: "Select",
		value: ["text", "number", "idcard", "price", "password", "search"],
		default: "text",
	} //文本

	disabled = {
		name: "禁用",
		type: "Switch",
		default: false,
	}

	readOnly = {
		name: "只读",
		type: "Switch",
		default: false,
	}

	rows = {
		name: "行数",
		type: "InputNumber",
		default: 0,
	}

	autoHeight = {
		name: "自适应高度",
		type: "Switch",
		default: false,
	}

	maxLength = {
		name: "最大长度",
		type: "InputNumber",
		default: 50,
	}

	showLength = {
		name: "显示字数",
		type: "Switch",
		default: false,
	}

	clearable = {
		name: "清除按钮",
		type: "Switch",
		default: false,
	}
}
export default new InputConfig()
