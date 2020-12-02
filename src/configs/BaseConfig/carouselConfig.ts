import {
	AddHidden,
	AddInput,
	AddList,
	AddName,
	AddNumber,
	AddSelect,
	AddSwitch,
} from "@/utils/QuickConfig"

export const imgConfig = {
	name: {
		name: "名称",
		...AddInput(""),
	},
	src: {
		name: "图片地址",
		...AddInput("12321"),
		...AddHidden(),
	},
	href: {
		name: "外部链接",
		...AddInput("1221312"),
		...AddHidden(),
	},
}

// 走马灯
export default {
	imgList: {
		...AddName("图片"),
		name: "图片",
		// 这里应该是与 CarouselConfig 相同的一个类
		// 但是 redux 无法存储 继承信息
		config: imgConfig,
		...AddList([
			{
				name: "图片1",
				src:
					"https://static.zhongan.com/website/health/zarm/images/banners/1.png",
				href: "https://zarm.gitee.io/#/components/radio",
			},
		]),
	},
	direction: {
		...AddName("方向"),
		...AddSelect("left"),
		value: ["left", "right", "up", "down"],
	},
	height: {
		name: "轮播高度",
		...AddNumber(160),
	},
	loop: {
		name: "循环",
		...AddSwitch(true),
	},
	swipeable: {
		name: "滑动",
		...AddSwitch(false),
	},
	autoPlay: {
		name: "自动轮播",
		...AddSwitch(true),
	},
	autoPlayIntervalTime: {
		name: "轮播间隔",
		...AddNumber(3000),
	},
	moveDistanceRatio: {
		name: "移动距离比例",
		...AddNumber(0.5),
	},
	moveTimeSpan: {
		name: "移动时间跨度",
		...AddNumber(300),
	},
	animationDuration: {
		name: "动画时间",
		...AddNumber(300),
	},

	showPagination: {
		name: "分页器",
		...AddSwitch(true),
	},
	position: {
		h: 8,
		minH: 8,
	},
}
