import { IConfigList } from "@/@types/page-config"
import { AddInput, AddList, AddNumber, AddSwitch } from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

// 走马灯
class CarouselConfig extends ConfigDefault {
	imgList: IConfigList = {
		name: "图片",
		// 这里应该是与 CarouselConfig 相同的一个类
		// 但是 redux 无法存储 继承信息
		value: {
			src: {
				name: "图片地址",
				...AddInput("12321"),
				hidden: false,
			},
			href: {
				name: "外部链接",
				...AddInput("1221312"),
				hidden: true,
			},
		},
		...AddList([
			{
				src:
					"https://static.zhongan.com/website/health/zarm/images/banners/1.png",
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

	height = {
		name: "轮播高度",
		...AddNumber(160),
	}

	//
	// activeIndex = { name: "" }

	loop = {
		name: "循环",
		...AddSwitch(true),
	}

	swipeable = {
		name: "滑动",
		...AddSwitch(false),
	}

	autoPlay = {
		name: "自动轮播",
		...AddSwitch(true),
	}

	autoPlayIntervalTime = {
		name: "轮播间隔",
		...AddNumber(3000),
	}

	moveDistanceRatio = {
		name: "移动距离比例",
		...AddNumber(0.5),
	}
	moveTimeSpan = {
		name: "移动时间跨度",
		...AddNumber(300),
	}
	animationDuration = {
		name: "动画时间",
		...AddNumber(300),
	}

	showPagination = {
		name: "分页器",
		...AddSwitch(true),
	}

	position = {
		h: 8,
		minH: 8,
	}
}
export default new CarouselConfig()
