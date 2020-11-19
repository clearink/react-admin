/**
 * 用来生成组件的Map
 */

export default {
	button: {
		text: "button", //文本
		type: ["primary", "default", "danger"], //类型
		size: ["small", "default"], // 尺寸
	},
	text: {
		text: "文本",
		type: ["left", "center", "right"], // 对齐方式
		fontSize: 16, // font-size
	},
	title: {
		text: "标题",
		type: ["left", "center", "right"], // 对齐方式
		fontSize: 16, // font-size
		background: "white", // 背景
		color: "black", // 文本颜色
	},
}
