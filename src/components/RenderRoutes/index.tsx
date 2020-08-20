import React, { FunctionComponent, Fragment } from "react"
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
				const { component, wrap, routes, layout, exact, path } = item
				const Wrap = wrap ?? Fragment
				const Layout = layout ?? Fragment
				const RouteComponent = component
				return (
					<Route
						key={item.path}
						exact={exact}
						path={path}
						render={(props) => {
							return (
								<Layout>
									<Wrap>
										<RouteComponent routes={routes} {...props} />
									</Wrap>
								</Layout>
							)
						}}
					/>
				)
			})}
		</Switch>
	)
}

export default RenderRoutes
