import React from "react"
import { IBaseProps } from "@/@types/fc"
import BaseLayout from "./BaseLayout"
import { useLocation } from "react-router-dom"
import LoginLayout from "./LoginLayout"

function Layout(props: IBaseProps) {
	const { children } = props
	const { pathname } = useLocation()
	if (pathname === "/login") return <LoginLayout>{children}</LoginLayout>
	return <BaseLayout>{children}</BaseLayout>
}

export default Layout
