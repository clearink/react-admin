import React from "react"
import { Route, Redirect } from "react-router-dom"
import Home from "@/pages/Home"
import { ReactNode } from "react"

interface IRoute {
	path: string
	component: ReactNode
	wrap?: ReactNode
}
const routes: IRoute[] = [
	{
		path: "/",
		component: Home,
	},
]
export const renderRoutes = (routes: IRoute[]) => {
	// return routes.map((item) => {
	// 	const { wrap, path } = item
	// 	if (wrap) {
	// 		return (
	// 			<wrap>
	// 				<Route path={path} />
	// 			</wrap>
	// 		)
	// 	} else {
	// 		return <Route path={path} render />
	// 	}
	// })
}

export default routes
