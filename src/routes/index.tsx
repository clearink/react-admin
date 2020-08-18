import React, { ReactNode, FunctionComponent } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import Home from "@/pages/Home"

interface IRoute {
	path: string
	component: FunctionComponent
	wrap?: ReactNode
}
const routes: IRoute[] = [
	{
		path: "/",
		component: Home,
	},
]
export const renderRoutes: ReactNode = (routes: IRoute[]) => {
	return routes.map((item) => {
		return <item.component />
	})
}

export default routes
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
