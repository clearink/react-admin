// 是否是根据路由数组来渲染side menu ?

import { IRoute } from "@/@types/route"
import React, { ComponentType, createElement, Fragment } from "react"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"

const { SubMenu, Item } = Menu

export default function RenderMenu(config?: IRoute[]): any {
	return config?.map((item) => {
		if (item.title) {
			if (item.routes) {
				return (
					<SubMenu
						title={item.title}
						icon={item?.icon && createElement(item?.icon as ComponentType<any>)}
						key={item?.path ?? item.key}
					>
						{RenderMenu(item.routes)}
					</SubMenu>
				)
			}
			return (
				<Item key={item.path ?? item.key}>
					{item.path && <NavLink to={item.path}>{item.title}</NavLink>}
				</Item>
			)
		}
		return (
			<Fragment key={item.path ?? item.key}>{RenderMenu(item.routes)}</Fragment>
		)
	})
}
