import React, { memo } from "react"
import { Progress } from "antd"
import { ProgressProps } from "antd/lib/progress"
import { BaseProFieldProps } from "../type"

// 进度条
export interface FieldProgressProps
	extends ProgressProps,
		BaseProFieldProps<FieldProgressProps> {
	text?: ProgressProps["percent"]
}

function FieldProgress(props: FieldProgressProps) {
	const { text, render, ...rest } = props

	const DOM = <Progress percent={text} {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}

export default memo(FieldProgress)
