import ConfigDefault from "../ConfigDefault"

class FilePickerConfig extends ConfigDefault {
	accept = { name: "文件格式", type: "Input", default: "*" }

	capture = {
		name: "原生能力",
		type: "Select",
		value: ["", "camera", "camcorder", "microphone"],
		default: "",
	}

	multiple = {
		name: "多选",
		type: "Switch",
		default: false,
	}

	disabled = {
		name: "禁用",
		type: "Switch",
		default: false,
	}
}
export default new FilePickerConfig()
