// 基础组件配置文件

// cover 图片
import button from "@/assets/images/components/button.jpg"
import icon from "@/assets/images/components/icon.jpg"
import filePicker from "@/assets/images/components/filePicker.jpg"
import carousel from "@/assets/images/components/carousel.jpg"
import keyboard from "@/assets/images/components/keyboard.jpg"
import searchBar from "@/assets/images/components/searchBar.jpg"
import slider from "@/assets/images/components/slider.jpg"
import stepper from "@/assets/images/components/stepper.jpg"
import { default as switchCover } from "@/assets/images/components/switch.jpg"

// config 配置
import buttonConfig from "./buttonConfig"
import iconConfig from "./iconConfig"
import filePickerConfig from "./filePickerConfig"
import carouselConfig from "./carouselConfig"
import { AddType } from "@/utils/QuickConfig"
import keyboardConfig from "./keyboardConfig"
import searchBarConfig from "./searchBarConfig"
import sliderConfig from "./sliderConfig"
import stepperConfig from "./stepperConfig"
import switchConfig from "./switchConfig"
import formConfig from "./formConfig"

// 配置列表
export default [
	{
		...AddType("Button"),
		name: "按钮",
		cover: button, // 封面图
		config: buttonConfig,
	},
	{
		...AddType("Form"),
		name: "表单",
		cover: button, // 封面图
		config: formConfig,
	},
	{
		type: "Icon",
		name: "图标",
		cover: icon,
		config: iconConfig,
	},
	{
		type: "FilePicker",
		name: "文件选择器",
		cover: filePicker,
		config: filePickerConfig,
	},
	{
		type: "Carousel",
		name: "走马灯",
		cover: carousel,
		config: carouselConfig,
	},
	{
		...AddType("Keyboard"),
		name: "虚拟键盘",
		cover: keyboard,
		config: keyboardConfig,
	},
	{
		...AddType("SearchBar"),
		name: "搜索栏",
		cover: searchBar,
		config: searchBarConfig,
	},
	{
		...AddType("Slider"),
		name: "滑动输入条",
		cover: slider,
		config: sliderConfig,
	},
	{
		...AddType("Stepper"),
		name: "步进器",
		cover: stepper,
		config: stepperConfig,
	},
	{
		...AddType("Switch"),
		name: "开关",
		cover: switchCover,
		config: switchConfig,
	},
] as {
	type: string
	name: string
	cover: string // 封面图
	config: any
	[key: string]: any
}[]
