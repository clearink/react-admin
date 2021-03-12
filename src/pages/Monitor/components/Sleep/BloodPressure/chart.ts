function chartOption(max: any[], min: any[], time: any[]) {
	return {
		tooltip: {
			trigger: "axis",
		},
		xAxis: {
			type: "category",
			data: time,
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "收缩压",
				type: "line",
				data: max,
			},
			{
				name: "舒张压",
				type: "line",
				data: min,
			},
		],
	}
}

export default chartOption

export const calcChartData = (chartData: any[]) => {
	return chartData.reduce(
		(pre: any, item: any) => {
			pre[0].push(item.dp)
			pre[1].push(item.sp)
			pre[2].push(item.startTime)
			return pre
		},
		[[], [], []] as const
	)
}
