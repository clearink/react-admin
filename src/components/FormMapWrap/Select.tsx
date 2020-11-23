import withDefaultProps from "@/hocs/withDefaultProps"
import { Select } from "antd"
import React, { memo, useMemo } from "react"

interface IProps {
	config: string[]
	[key: string]: any
}
function WrappedSelect(props: IProps) {
	const { config, ...rest } = props
	const options = useMemo(() => config.map((value) => ({ value })), [config])
	return <Select options={options} {...rest} />
}

export default memo(withDefaultProps(WrappedSelect, { config: [] }))
