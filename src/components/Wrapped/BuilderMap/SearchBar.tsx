import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { SearchBar } from "zarm"

function WrappedSearchBar(props: any) {
	return <SearchBar {...props} className='w-full' />
}

export default memo(withDefaultProps(WrappedSearchBar, {}))
