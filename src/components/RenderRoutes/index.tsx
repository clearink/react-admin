import React, { Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import { IRoute } from "@/@types/route"

interface IProps {
	routes: IRoute[]
}
function RenderRoutes(props: IProps) {
	const { routes } = props
	return (
		<Switch>
			{(routes as IRoute[]).map((item) => {
				const { component, wrap, routes, exact, path } = item
				const Wrap = wrap ?? Fragment
				const RouteComponent = component
				return (
					<Route
						key={item.path ?? item.key}
						exact={exact}
						path={path}
						render={(props) => {
							return (
								<Wrap>
									<RouteComponent routes={routes} {...props} />
								</Wrap>
							)
						}}
					/>
				)
			})}
		</Switch>
	)
}

export default RenderRoutes
