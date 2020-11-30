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
import ConfigDefault from "../ConfigDefault"
import searchBarConfig from "./searchBarConfig"
import sliderConfig from "./sliderConfig"
import stepperConfig from "./stepperConfig"
import switchConfig from "./switchConfig"
import formConfig from "./formConfig"

// 如何优化 ?
class Config extends ConfigDefault {
	Button = {
		...AddType("Button"),
		name: "按钮",
		cover: button, // 封面图
		config: buttonConfig,
	}
	Form = {
		...AddType("Form"),
		name: "表单",
		cover: button, // 封面图
		config: formConfig,
	}

	Icon = {
		type: "Icon",
		name: "图标",
		cover: icon,
		config: iconConfig,
	}

	FilePicker = {
		type: "FilePicker",
		name: "文件选择器",
		cover: filePicker,
		config: filePickerConfig,
	}
	Carousel = {
		type: "Carousel",
		name: "走马灯",
		cover: carousel,
		config: carouselConfig,
	}
	Keyboard = {
		...AddType("Keyboard"),
		name: "虚拟键盘",
		cover: keyboard,
		config: keyboardConfig,
	}

	SearchBar = {
		...AddType("SearchBar"),
		name: "搜索栏",
		cover: searchBar,
		config: searchBarConfig,
	}

	Slider = {
		...AddType("Slider"),
		name: "滑动输入条",
		cover: slider,
		config: sliderConfig,
	}

	Stepper = {
		...AddType("Stepper"),
		name: "步进器",
		cover: stepper,
		config: stepperConfig,
	}

	Switch = {
		...AddType("Switch"),
		name: "开关",
		cover: switchCover,
		config: switchConfig,
	}
}
export default new Config()
