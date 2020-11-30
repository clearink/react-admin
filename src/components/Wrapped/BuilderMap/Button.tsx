import React, { memo, useCallback, MouseEvent } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Button } from "zarm"
import createFunction from "@/utils/createFunction"
import { message } from "antd"

interface IProps {
	[key: string]: any
}

// 封装Button组件 尝试让他能够自定义点击事件
function WrappedButton(props: IProps) {
	const { action, ...rest } = props
	console.log("WrappedButton", props)
	const handleClick = useCallback(
		(event: MouseEvent) => {
			try {
				createFunction(props.action)(event, props)
			} catch (error) {
				message.error("构建失败")
			}
		},
		[props]
	)
	return <Button onClick={handleClick} {...rest} />
}

export default memo(withDefaultProps(WrappedButton, {}))
