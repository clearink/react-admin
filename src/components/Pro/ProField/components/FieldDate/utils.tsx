import React, { Fragment } from "react"
import { Space } from "antd"
import { Moment } from "moment"
import { isArray } from "@/utils/validate"

// 将 timeValue转成字符
export function momentToText(
	timeValue: Moment | Array<Moment>,
	fromNow?: boolean,
	timeFormat?: string
): JSX.Element {
	if (isArray(timeValue))
		return (
			<Space>
				{timeValue.map((item, index) => (
					<Fragment key={index}>
						{momentToText(item, fromNow, timeFormat)}
					</Fragment>
				))}
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
