// 基础组件配置文件

// cover 图片
import button from "@/assets/images/components/button.jpg"
import icon from "@/assets/images/components/icon.jpg"
import filePicker from "@/assets/images/components/filePicker.jpg"
import carousel from "@/assets/images/components/carousel.jpg"

import buttonConfig from "./buttonConfig"
import iconConfig from "./iconConfig"
import filePickerConfig from "./filePickerConfig"
import carouselConfig from "./carouselConfig"

// 如何优化 ?
class Config {
	Button = {
		type: "Button",
		name: "按钮",
		cover: button, // 封面图
		config: buttonConfig,
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

	get list(): any[] {
		return Object.values(this)
	}
}
export default new Config()
