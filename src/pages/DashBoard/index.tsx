import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"

function DashBoard(props: IBaseProps) {
	const { children } = props
	useEffect(() => {
		console.log("in DashBoard container")
	}, [])
	return <div className='page_dashboard_container'>{children}</div>
}

export default DashBoard
