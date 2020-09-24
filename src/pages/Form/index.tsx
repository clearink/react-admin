import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"

function DashBoard(props: IBaseProps) {
	const { children } = props
	useEffect(() => {
		console.log("in Form container")
	}, [])
	return <div className='page_form_container'>{children}</div>
}

export default DashBoard
