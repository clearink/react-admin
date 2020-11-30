import {
	AddInput,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class sliderConfig extends ConfigDefault {
	value = {
		name: "值",
		...AddInput(10),
	}

	min = {
		name: "最小值",
		...AddNumber(0),
	}

	max = {
		name: "最大值",
		...AddNumber(100),
	}

	disabled = {
		name: "禁用",
		...AddSwitch(),
	}

	step = {
		name: "步长",
		...AddNumber(1),
	}
	vertical = {
		name: "垂直",
		...AddSwitch(),
	}
	showMark = {
		name: "显示刻度",
		...AddSwitch(),
	}

	marks = {
		name: "自定义刻度",
		...AddInput(),
		...AddOptional,
	}
	position = {
		h: 2,
	}
}
export default new sliderConfig()
