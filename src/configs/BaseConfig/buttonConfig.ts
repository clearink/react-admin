import { AddInput, AddSelect, AddSwitch } from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class ButtonConfig extends ConfigDefault {
	children = { name: "文本", ...AddInput("按钮") } //文本
	theme = {
		name: "主题",
		value: ["primary", "default", "danger"],
		...AddSelect("primary"),
	} //类型

	size = {
		name: "尺寸",
		value: ["md", "lg", "sm", "xs"],
		...AddSelect("md"),
	} // 尺寸

	shape = {
		name: "形状",
		value: ["radius", "rect", "round", "circle"],
		...AddSwitch("radius"),
	}

	block = {
		name: "块级元素",
		...AddSwitch(),
	}
	ghost = {
		name: "幽灵按钮",
		...AddSwitch(),
	}

	shadow = {
		name: "阴影",
		...AddSwitch(),
	}

}
export default new ButtonConfig()
