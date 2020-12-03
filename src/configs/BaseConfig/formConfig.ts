import {
	AddColor,
	AddInput,
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
		...AddInput("表单标题"),
	},
	fontSize: {
		...AddName("标题大小"),
		...AddNumber(20),
	},
	color:{
		...AddName("文本颜色"),
		...AddColor("#000")
	}
}
export default {
	title: {
		...AddName("标题"),
		// ...AddInput("表单标题"),
		value: titleConfig,
	}, //文本

	// 此处应该是一个buttonConfig list
}
