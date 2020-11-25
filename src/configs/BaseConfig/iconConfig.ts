import { AddSelect } from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class IconConfig extends ConfigDefault {
	theme = {
		name: "主题",
		value: ["primary", "default", "success", "warning", "danger"],
		...AddSelect("primary"),
	} // 主题
	size = {
		name: "尺寸",
		value: ["md", "sm", "lg"],
		...AddSelect("md"),
	}
	type = {
		name: "类型",
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
		...AddSelect("add"),
	}

	position = {
		h: 2,
		w: 2,
	}
}
export default new IconConfig()
