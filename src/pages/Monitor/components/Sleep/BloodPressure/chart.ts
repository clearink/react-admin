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
