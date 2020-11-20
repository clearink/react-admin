/**
 * 用来生成组件的Map
 */

// cover
import button from "@/assets/images/components/button.jpg"
import icon from "@/assets/images/components/icon.jpg"
export default {
	Button: {
		type: "Button",
		name: "Button 按钮",
		cover: button, // 封面图
		config: {
			children: { name: "文本", type: "Input", default: "按钮" }, //文本
			theme: {
				name: "主题",
				type: "Select",
				value: ["primary", "default", "danger"],
				default: "primary",
			}, //类型
			size: {
				name: "尺寸",
				type: "Select",
				value: ["md", "lg", "sm", "xs"],
				default: "md",
			}, // 尺寸
			shape: {
				name: "形状",
				type: "Select",
				value: ["radius", "rect", "round", "circle"],
				default: "radius",
			},
			block: {
				name: "块级元素",
				type: "Switch",
				default: false,
			},
			ghost: {
				name: "幽灵按钮",
				type: "Switch",
				default: false,
			},
			shadow: {
				name: "阴影",
				type: "Switch",
				default: false,
			},
		},
	},
	Icon: {
		type: "Icon",
		name: "Icon 图标",
		cover: icon,
		config: {
			theme: {
				name: "主题",
				type: "Select",
				value: ["primary", "default", "success", "warning", "danger"],
				default: "primary",
			}, // 主题
			size: {
				name: "尺寸",
				type: "Select",
				value: ["md", "sm", "lg"],
				default: "md",
			},
			type: {
				name: "类型",
				type: "Select",
				value: [
					"add",
					"add-round",
					"add-round-fill",
					"minus",
					"minus-round",
					"minus-round-fill",
					"arrow-top",
					"arrow-bottom",
					"arrow-left",
					"arrow-right",
					"info-round",
					"info-round-fill",
					"warning-round",
					"warning-round-fill",
					"right",
					"right-round",
					"right-round-fill",
					"wrong",
					"wrong-round",
					"wrong-round-fill",
					"question-round",
					"question-round-fill",
					"required",
					"broadcast",
					"deletekey",
					"keyboard",
					"search",
					"date",
					"time",
				],
				default: "add",
			},
		},
	},
}
