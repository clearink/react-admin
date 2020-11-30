import {
	AddInput,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class switchConfig extends ConfigDefault {
	checked = {
		name: "选中",
		...AddSwitch(true),
	}
	disabled = {
		name: "禁用",
		...AddSwitch(),
	}

	position = {
		h: 2,
		w: 3,
	}
}
export default new switchConfig()
