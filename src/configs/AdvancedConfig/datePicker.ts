import ConfigDefault from "../ConfigDefault"

class CalendarConfig extends ConfigDefault {
	value = { name: "日期", type: "Date", default: new Date() } //文本

	min = {
		name: "最小时间",
		type: "Date",
		default: new Date(),
	}

	max = {
		name: "最小时间",
		type: "Date",
		default: new Date(),
	}

	theme = {
		name: "主题",
		type: "Select",
		value: ["primary", "default", "danger"],
		default: "primary",
	} //类型

	multiple = {
		name: "双选",
		type: "Switch",
		default: false,
	}

	disabledDate = {
		name: "禁用",
		type: "Switch",
		default: false,
	}
}
export default new CalendarConfig()
