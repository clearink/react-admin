import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Switch } from "antd"

interface IProps {
	value: boolean
	[key: string]: any
}
function WrappedSwitch(props: IProps) {
	const { value, ...rest } = props
	return <Switch checked={value} {...rest} />
}

export default memo(withDefaultProps(WrappedSwitch, { value: false }))
