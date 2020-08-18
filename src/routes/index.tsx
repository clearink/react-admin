import React, { FunctionComponent } from "react"
import { Route } from "react-router-dom"
import Home from "@/pages/Home"

const routes: IRoute[] = [
	{
		path: "/",
		component: Home,
	},
]
export const renderRoutes = (routes: IRoute[]) => {
	return routes.map((item) => {
		const { component, wrap, routes, ...RouteProps } = item
		if (wrap) {
			const Wrap = item.wrap as FunctionComponent
			return (
				<Wrap key={item.path}>
					<Route
						{...RouteProps}
						render={(props) => <item.component routes={routes} {...props} />}
					/>
				</Wrap>
			)
		}
		return (
			<Route
				key={item.path}
				{...RouteProps}
				render={(props) => <item.component routes={routes} {...props} />}
			/>
		)
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
