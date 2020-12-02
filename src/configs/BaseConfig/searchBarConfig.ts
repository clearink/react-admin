import {
	AddDisable,
	AddInput,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

export default {
	placeholder: {
		...AddInput("搜索"),
		name: "占位符",
	},
	value: {
		name: "值",
		...AddInput(),
		...AddOptional,
	},
	shape: {
		...AddSelect("radius"),
		name: "形状",
		value: ["rect", "radius", "round"],
	},
	...AddDisable(),
	showCancel: {
		name: "显示取消按钮",
		...AddSwitch(),
	},
	cancelText: {
		name: "取消按钮文字",
		...AddInput("取消"),
	},
	maxLength: {
		name: "最大字数",
		...AddNumber(100),
	},
	clearable: {
		name: "可清空",
		...AddSwitch(),
	},
	position: {
		h: 2,
	},
}
