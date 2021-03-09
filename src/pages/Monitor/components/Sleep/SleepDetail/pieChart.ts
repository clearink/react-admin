// 环形饼图配置
const PieChartOptions = {
	title: {
		text: "睡眠分布",
		left: "center",
		top:'5%'
	},
	tooltip: {
		show: false,
	},
	legend: {
		show: false,
	},
	series: [
		{
			name: "睡眠分布",
			type: "pie",
			radius: ["60%", "80%"],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: "center",
			},
			emphasis: {
				label: {
					show: false,
				},
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 1048, name: "搜索引擎" },
				{ value: 735, name: "直接访问" },
				{ value: 580, name: "邮件营销" },
				{ value: 484, name: "联盟广告" },
				{ value: 300, name: "视频广告" },
			],
		},
	],
}
export default PieChartOptions
