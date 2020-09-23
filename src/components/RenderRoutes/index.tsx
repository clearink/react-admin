import React, { ComponentType, Fragment, lazy, memo } from "react"
import { Route, Switch } from "react-router-dom"
import { IRoute } from "@/@types/route"
import { IBaseProps } from "@/@types/fc"
import WithLazyLoad from "@/hocs/WithLazyLoad"

interface IProps {
	routes: IRoute[]
}
function RenderRoutes(props: IProps) {
	const { routes } = props
	return (
		<Switch>
			{routes?.map((item) => {
				const { component, wrap, routes, exact, path } = item
				const Wrap: ComponentType<any> = wrap
					? WithLazyLoad(lazy(() => import(wrap)))
					: Fragment
				const RouteComponent: ComponentType<IBaseProps> = WithLazyLoad(
					lazy(() => import(component))
				)
				return (
					<Route
						key={item.path ?? item.key}
						exact={exact}
						path={path}
						render={(props) => {
							return (
								<Wrap>
									<RouteComponent {...props}>
										{routes && <RenderRoutes routes={routes} />}
									</RouteComponent>
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
