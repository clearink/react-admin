import {
	AddInput,
	AddOptional,
	AddSelect,
	AddSwitch,
	AddType,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class FormConfig extends ConfigDefault {
	title = {
		name: "title",
		...AddInput("表单标题"),
	} //文本

	// 此处应该是一个buttonConfig
	submit = {}

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
		...AddSelect("radius"),
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

	action = {
		name: "事件",
		...AddOptional,
		...AddInput(),
	}
}
export default new FormConfig()
