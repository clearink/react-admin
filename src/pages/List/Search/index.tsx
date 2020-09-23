import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"

function ListSearch(props: IBaseProps) {
	const { children } = props
	useEffect(() => {
		console.log("in ListSearch container")
	}, [])
	return <div className='page_list-search_container'>{children}</div>
}

export default ListSearch
