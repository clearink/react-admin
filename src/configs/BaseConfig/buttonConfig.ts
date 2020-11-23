import ConfigDefault from "../ConfigDefault"

class ButtonConfig extends ConfigDefault {
	children = { name: "文本", type: "Input", default: "按钮" } //文本

	theme = {
		name: "主题",
		type: "Select",
		value: ["primary", "default", "danger"],
		default: "primary",
	} //类型

	size = {
		name: "尺寸",
		type: "Select",
		value: ["md", "lg", "sm", "xs"],
		default: "md",
	} // 尺寸

	shape = {
		name: "形状",
		type: "Select",
		value: ["radius", "rect", "round", "circle"],
		default: "radius",
	}

	block = {
		name: "块级元素",
		type: "Switch",
		default: false,
	}
	ghost = {
		name: "幽灵按钮",
		type: "Switch",
		default: false,
	}

	shadow = {
		name: "阴影",
		type: "Switch",
		default: false,
	}
}
export default new ButtonConfig()
