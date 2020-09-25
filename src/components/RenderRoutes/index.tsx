import React, { ComponentType, Fragment, lazy, memo } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { IRoute } from "@/@types/route"
import { IBaseProps } from "@/@types/fc"

interface IProps {
	routes: IRoute[]
}
function RenderRoutes(props: IProps) {
	const { routes } = props
	return (
		<Switch>
			{routes?.map((item) => {
				const { component, wrap, routes, exact, redirect, path } = item
				const Wrap = wrap ?? Fragment
				const RouteComponent = component as ComponentType<IBaseProps>
				return (
					<Route
						key={item.path ?? item.key}
						exact={exact}
						path={path}
						render={(props) => {
							return (
								<Wrap>
									{redirect ? (
										<Redirect to={redirect as string} />
									) : (
										<RouteComponent {...props} routes={routes}>
											{routes && <RenderRoutes routes={routes} />}
										</RouteComponent>
									)}
								</Wrap>
							)
						}}
					/>
				)
			})}
		</Switch>
	)
}

export default memo(RenderRoutes)
