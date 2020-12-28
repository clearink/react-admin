import React from "react"
import { Space } from "antd"
import { Moment } from "moment"
import { isArray } from "@/utils/validate"

// 将 timeValue转成字符
export function momentToText(
	timeValue: Moment | [Moment, Moment],
	fromNow?: boolean,
	timeFormat?: string
): JSX.Element {
	if (isArray(timeValue))
		return (
			<Space>
				{timeValue.map((item) => momentToText(item, fromNow, timeFormat))}
			</Space>
		)
	return (
		<span key={timeValue.unix()}>
			{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}
		</span>
	)
}
/*
<span>
				{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}
			</span>
*/
