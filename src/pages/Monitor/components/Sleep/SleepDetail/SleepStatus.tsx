import withDefaultProps from "@/hocs/withDefaultProps"
import { Badge } from "antd"
import React from "react"

export interface SleepStatusProps {
	score: number
	title: string
	color?: string
}
function SleepStatus(props: SleepStatusProps) {
	const { score, color, title } = props
	return (
		<div className='flex w-full justify-around'>
			<Badge text={title} color={color} />
			<span>{score || "暂无数据"}</span>
		</div>
	)
}

export default withDefaultProps(SleepStatus, { score: 0 })
