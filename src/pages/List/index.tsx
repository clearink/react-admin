import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"

function ListSearch(props: IBaseProps) {
	const { children } = props
	useEffect(() => {
		console.log("in List container")
	}, [])
	return <div className='page_list_container'>{children}</div>
}

export default ListSearch
