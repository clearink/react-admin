import React, { memo } from "react"
import { Avatar as AntdAvatar } from "antd"
import { AvatarProps } from "antd/lib/avatar"

interface IProps extends Omit<AvatarProps, "src"> {
	src?: string
}

function Avatar(props: IProps) {
	return <AntdAvatar {...props} />
}

export default memo(Avatar)
