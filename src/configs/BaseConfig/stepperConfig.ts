import {
	AddInput,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class stepperConfig extends ConfigDefault {
	shape = {
		name: "形状",
		value: ["radius", "rect", "circle"],
		...AddSelect("radius"),
	}

	size = {
		name: "尺寸",
		value: ["md", "lg"],
		...AddSelect("md"),
	} // 尺寸

	value = {
		name: "值",
		...AddInput(10),
	}

	min = {
		name: "最小值",
		...AddNumber(),
		...AddOptional,
	}

	max = {
		name: "最大值",
		...AddNumber(),
		...AddOptional,
	}

	disabled = {
		name: "禁用",
		...AddSwitch(),
	}

	step = {
		name: "步长",
		...AddNumber(1),
	}

	position = {
		h: 2,
		w: 7,
	}
}
export default new stepperConfig()
