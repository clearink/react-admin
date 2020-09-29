import React, { memo, ReactNode } from "react"
interface IProps {
	children: ReactNode
}
function BlankLayout(props: IProps) {
	return <>{props.children}</>
}

export default memo(BlankLayout)
