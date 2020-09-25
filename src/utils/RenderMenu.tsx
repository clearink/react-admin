// 根据路由数组来渲染side menu ?

import React, { ReactNode } from "react"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import IconFont from "@/components/IconFont"

const { SubMenu, Item } = Menu

export default function RenderMenu(config?: TMenu[]): ReactNode {
	return config?.map((item) => {
		if (item.title) {
			if (item.routes) {
				return (
					<SubMenu
						title={item.title}
						icon={item?.icon && <IconFont type={item.icon} />}
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
		return RenderMenu(item.routes)
	})
}
