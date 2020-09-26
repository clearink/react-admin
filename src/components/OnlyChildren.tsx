import React, { memo, ReactNode } from "react"
interface IProps {
	children: ReactNode
}
function OnlyChildren(props: IProps) {
	return <>{props.children}</>
}

export default memo(OnlyChildren)
