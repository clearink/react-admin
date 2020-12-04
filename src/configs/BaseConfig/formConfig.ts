import {
	AddColor,
	AddInput,
	AddList,
	AddName,
	AddNumber,
	AddOptional,
	AddSelect,
	AddSwitch,
	AddType,
} from "@/utils/QuickConfig"
const titleConfig = {
	text: {
		...AddName("表单标题"),
		...AddInput(""),
	},
	fontSize: {
		...AddName("标题大小"),
		...AddNumber(20),
	},
	color: {
		...AddName("文本颜色"),
		...AddColor("#000"),
	},
}
//表单控件
const formControlConfig = {
	name: {
		...AddName("名称"),
		...AddInput(""),
	},
	type: {
		...AddName("类型"),
		...AddSelect("Input"),
		value: ["Input", "Number", "Date", "TextArea"],
	},
}
export default {
	title: {
		...AddName("标题"),
		...AddType("List"),
		value: titleConfig,
	},

	control: {
		...AddName("表单控件"),
		...AddList([]),
		value: formControlConfig,
	},
}
