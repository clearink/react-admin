import React, { ReactNode } from "react"
import { Moment } from "moment"
import { Space } from "antd"
import { isArray } from "@/utils/validate"

// 将 timeValue转成字符
export function momentToText(
	timeValue: any,
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
		<span>{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}</span>
	)
}
/*
<span>
				{fromNow ? timeValue.fromNow() : timeValue.format(timeFormat)}
			</span>
*/
