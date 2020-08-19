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
				const { component, wrap, routes, layout, ...RouteProps } = item
				const Wrap = wrap ?? Fragment
				const Layout = layout ?? Fragment
				return (
					<Route
						key={item.path}
						{...RouteProps}
						render={(props) => {
							console.log("render routes", props.match, RouteProps)
							return (
								<Wrap>
									<Layout>
										<item.component routes={routes} {...props} />
									</Layout>
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
