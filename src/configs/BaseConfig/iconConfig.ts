import ConfigDefault from "../ConfigDefault"

class IconConfig extends ConfigDefault {
	theme = {
		name: "主题",
		type: "Select",
		value: ["primary", "default", "success", "warning", "danger"],
		default: "primary",
	} // 主题
	size = {
		name: "尺寸",
		type: "Select",
		value: ["md", "sm", "lg"],
		default: "md",
	}
	type = {
		name: "类型",
		type: "Select",
		value: [
			"add",
			"add-round",
			"add-round-fill",
			"minus",
			"minus-round",
			"minus-round-fill",
			"arrow-top",
			"arrow-bottom",
			"arrow-left",
			"arrow-right",
			"info-round",
			"info-round-fill",
			"warning-round",
			"warning-round-fill",
			"right",
			"right-round",
			"right-round-fill",
			"wrong",
			"wrong-round",
			"wrong-round-fill",
			"question-round",
			"question-round-fill",
			"required",
			"broadcast",
			"deletekey",
			"keyboard",
			"search",
			"date",
			"time",
		],
		default: "add",
	}
}
export default new IconConfig()
