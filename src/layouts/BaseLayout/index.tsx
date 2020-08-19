import React, { useEffect, memo } from "react"
import RenderRoutes from "@/components/RenderRoutes"
import { IBaseProps } from "@/@types/fc"
import { IRoute } from "@/@types/route"
function BaseLayout(props: IBaseProps) {
	const { children, routes } = props
	useEffect(() => {
		console.log("baseLayout 挂载")
	}, [])
	return (
		<div className='app-base-layout'>
			<header>baseLayout</header>
			<RenderRoutes routes={routes as IRoute[]} />
		</div>
	)
}

export default memo(BaseLayout)
