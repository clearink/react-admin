export const HEART_LIST_MAX = 2000
export const BREATH_LIST_MAX = 3000

export const HeartChartOption = (data: number[]) => {
	const timeList = Array.from(
		{ length: Math.min(HEART_LIST_MAX, data.length) },
		(_, i) => i
	)
	return {
		tooltip: {
			trigger: "axis",
			formatter: (params: any) =>
				`${params[0].marker} ${params[0].seriesName} : ${params[0].data}`,
			axisPointer: {
				animation: false,
			},
		},
		grid: { left: "2%", right: "2%", bottom: "0" },
		xAxis: { show: false, data: timeList, boundaryGap: false },
		yAxis: {
			type: "value",
			show: false,
			boundaryGap: [0, "30%"],
		},
		dataZoom: [
			{
				show: true,
				type: "inside",
				filterMode: "none",
				yAxisIndex: [0],
				startValue: 25000,
				endValue: 40000,
			},
		],
		series: [
			{
				name: "心率",
				type: "line",
				width: 1,
				smooth: true,
				showSymbol: false,
				hoverAnimation: false,
				itemStyle: { color: "#f94e77" },
				data,
			},
		],
	}
}

// 呼吸
export const BreathChartOption = (data: number[]) => {
	const timeList = Array.from(
		{ length: Math.min(BREATH_LIST_MAX, data.length) },
		(_, i) => i
	)
	return {
		tooltip: {
			trigger: "axis",
			formatter: (params: any) =>
				`${params[0].marker} ${params[0].seriesName} : ${params[0].data}`,
			axisPointer: {
				animation: false,
			},
		},
		grid: { left: "2%", right: "2%", bottom: "4%" },
		xAxis: { show: false, data: timeList, boundaryGap: false },
		yAxis: { type: "value", show: false, boundaryGap: false },
		series: [
			{
				name: "呼吸率",
				type: "line",
				width: 1,
				smooth: true,
				showSymbol: false,
				hoverAnimation: false,
				itemStyle: { color: "#1ad59d" },
				data,
			},
		],
	}
}

export const GetWsToken = (token: string, deviceNum: string) => {
	return JSON.stringify({
		msgType: "login",
		data: {
			token: token,
			deviceNo: deviceNum,
		},
	})
}
// [心率, 呼吸率,心率, 呼吸率,心率, 呼吸率]
export const FormatWsData = (data: number[]) =>
	data.reduce(
		(pre, cur, i) => {
			pre[i % 2].push(cur)
			return pre
		},
		[[], []] as [number[], number[]]
	)
