import {
	AddInput,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class searchConfig extends ConfigDefault {
	placeholder = {
		name: "占位符",
		...AddInput("搜索"),
	}

	value = {
		name: "值",
		...AddInput(),
		...AddOptional,
	}

	shape = {
		name: "形状",
		value: ["rect", "radius", "round"],
		...AddSelect("radius"),
	}

	disabled = {
		name: "禁用",
		...AddSwitch(),
	}

	showCancel = {
		name: "显示取消按钮",
		...AddSwitch(),
	}
	cancelText = {
		name: "取消按钮文字",
		...AddInput("取消"),
	}
	maxLength = {
		name: "最大字数",
		...AddNumber(100),
	}
	clearable = {
		name: "可清空",
		...AddSwitch(),
	}

	position = {
		h: 2,
	}
}
export default new searchConfig()
