import React from "react"
import { IBaseProps } from "@/@types/fc"
import BaseLayout from "./BaseLayout"
import { useLocation } from "react-router-dom"
import LoginLayout from "./LoginLayout"
import RenderRoutes from "@/components/RenderRoutes"

function Layout(props: IBaseProps) {
	const { routes } = props
	const { pathname } = useLocation()
	if (pathname === "/login")
		return (
			<LoginLayout>
				<RenderRoutes routes={routes} />
			</LoginLayout>
		)
	return (
		<BaseLayout>
			<RenderRoutes routes={routes} />
		</BaseLayout>
	)
}

export default Layout
