import {
	AddInput,
	AddName,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

const a = {
	children: {
		...AddName("文本"),
		...AddInput("按钮"),
	},
	theme: {
		...AddName("主题"),
		...AddSelect("primary"),
		value: ["primary", "default", "danger"],
	},
	size: {
		...AddName("尺寸"),
		...AddSelect("md"),
		value: ["md", "lg", "sm", "xs"],
	},
	shape: {
		...AddName("形状"),
		...AddSelect("radius"),
		value: ["radius", "rect", "round", "circle"],
	},
	
	block : {
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
		...AddSelect("radius"),
	}

}
export default new ButtonConfig()
