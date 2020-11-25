import ConfigDefault from "../ConfigDefault"

// 走马灯
class CarouselConfig extends ConfigDefault {
	imgList = {
		name: "图片",
		type: "Select",
		value: [
			"https://static.zhongan.com/website/health/zarm/images/banners/1.png",
			"https://static.zhongan.com/website/health/zarm/images/banners/2.png",
			"https://static.zhongan.com/website/health/zarm/images/banners/3.png",
		],
		default: [
			"https://static.zhongan.com/website/health/zarm/images/banners/1.png",
			"https://static.zhongan.com/website/health/zarm/images/banners/2.png",
			"https://static.zhongan.com/website/health/zarm/images/banners/3.png",
		],
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
	}
}
export default new CarouselConfig()
