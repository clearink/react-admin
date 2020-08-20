import React from "react"
import { IBaseProps } from "@/@types/fc"
import RenderRoutes from "@/components/RenderRoutes"
import { IRoute } from "@/@types/route"
import BaseLayout from "./BaseLayout"
import { useLocation } from "react-router-dom"
import LoginLayout from "./LoginLayout"

function Layout(props: IBaseProps) {
	const { routes } = props
	const location = useLocation()
	const LayoutComponent =
		location.pathname === "/login" ? LoginLayout : BaseLayout

	return (
		<LayoutComponent>
			<RenderRoutes routes={routes as IRoute[]} />
		</LayoutComponent>
	)
}

export default Layout
