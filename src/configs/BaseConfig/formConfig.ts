import {
	AddInput,
	AddName,
	AddOptional,
	AddSelect,
	AddSwitch,
	AddType,
} from "@/utils/QuickConfig"
export default {
	title: {
		...AddName("标题"),
		...AddInput("表单标题"),
	}, //文本

	// 此处应该是一个buttonConfig list
}
