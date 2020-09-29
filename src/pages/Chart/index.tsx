import PageHeaderWrap from "@/components/PageHeaderWrap"
import React, { createElement } from "react"
import { Chart, Interval } from "bizcharts"
import { Input } from "antd"
// 数据源
const data = [
	{ genre: "Sports", sold: 275 },
	{ genre: "Strategy", sold: 115 },
	{ genre: "Action", sold: 120 },
	{ genre: "Shooter", sold: 350 },
	{ genre: "Other", sold: 150 },
]
function index() {
	return (
		<div>
			<PageHeaderWrap title='表格简介' className='bg-white' />
			<div>一些基本的图表 基于 bizCharts</div>
			{createElement(Input, { value: "12123" })}
			<Chart height={400} autoFit data={data}>
				<Interval position='genre*sold' color='genre' />
			</Chart>
		</div>
	)
}

export default index
