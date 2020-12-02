import {
	AddDisable,
	AddInput,
	AddName,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"

export default {
	accept: {
		...AddName("文件格式"),
		...AddInput("*"),
	},
	capture: {
		...AddName("原生能力"),
		...AddSelect(""),
		value: ["", "camera", "camcorder", "microphone"],
	},
	multiple: {
		...AddName("多选"),
		...AddSwitch(),
	},
	...AddDisable(),
}
