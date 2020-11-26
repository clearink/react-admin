import { IConfigList } from "@/@types/page-config"
import { AddInput, AddList } from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class ImgListConfig extends ConfigDefault {}

// 走马灯
class CarouselConfig extends ConfigDefault {
	imgList: IConfigList = {
		name: "图片",
		// 这里应该是与 CarouselConfig 相同的一个类
		// 但是 redux 无法存储 继承信息
		value: {
			src: {
				name: "图片地址",
				...AddInput(),
				hidden: false,
			},
			href: {
				name: "外部链接",
				...AddInput(),
				hidden: true,
			},
		},
		...AddList([
			{
				src:
					"https://static.zhongan.com/website/health/zarm/images/banners/1.png",
				href: "https://zarm.gitee.io/#/components/radio",
			},
			{
				src:
					"https://static.zhongan.com/website/health/zarm/images/banners/2.png",
				href: "https://zarm.gitee.io/#/components/radio",
			},
			{
				src:
					"https://static.zhongan.com/website/health/zarm/images/banners/3.png",
				href: "https://zarm.gitee.io/#/components/radio",
			},
		]),
	}
	direction = {
		name: "方向",
		type: "Select",
		default: "left",
		value: ["left", "right", "up", "down"],
	}

	height = { name: "轮播高度", type: "InputNumber", default: 160 }

	//
	// activeIndex = { name: "" }

	loop = {
		name: "循环",
		type: "Switch",
		default: true,
	}

	swipeable = {
		name: "滑动",
		type: "Switch",
		default: false,
	}

	autoPlay = {
		name: "自动轮播",
		type: "Switch",
		default: true,
	}

	autoPlayIntervalTime = {
		name: "轮播间隔",
		type: "InputNumber",
		default: 3000,
	}

	moveDistanceRatio = {
		name: "移动距离比例",
		type: "InputNumber",
		default: 0.5,
	}
	moveTimeSpan = {
		name: "移动时间跨度",
		type: "InputNumber",
		default: 300,
	}
	animationDuration = {
		name: "动画时间",
		type: "InputNumber",
		default: 300,
	}

	showPagination = {
		name: "分页器",
		type: "Switch",
		default: false,
	}

	position = {
		h: 8,
		minH: 8,
	}
}
export default new CarouselConfig()
