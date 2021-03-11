const LineChartOptions = {
	title: {
    },
    tooltip: {
    },
    legend: {
        data: ['销量', '利润', '比率']
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
}
export default LineChartOptions
