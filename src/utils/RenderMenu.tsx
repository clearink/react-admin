// 根据路由数组来渲染side menu ?

import React, { ReactNode } from "react"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import IconFont from "@/components/IconFont"
import { TMenu } from "@/@types/menu"

const { SubMenu, Item } = Menu

/**
 * 菜单渲染逻辑
 * @param config
 *
 * 相关字段
 * 1. hide 控制是否隐藏菜单
 * 2. title 默认如果有title 字段,则自动生成菜单
 * 3. routes 如果有routes 会使 字段 变成 SubMenu
 *
 *	逻辑

 * Q: 如果SubMenu 使用了 hide 字段, 子菜单是否隐藏?
 * 
 * A: 不会隐藏,将会提升至上一级
 */
export default function RenderMenu(config?: TMenu[]): ReactNode {
	return config?.map((item) => {
		if (item.routes) {
			if (!item.title || item.hide) {
				return RenderMenu(item.routes) // 没有title属性 或者 设置了hide 直接查看下一级
			}
			return (
				<SubMenu
					title={item.title}
					icon={item?.icon && <IconFont type={item.icon} />}
					key={item?.key ?? item.path}
				>
					{RenderMenu(item.routes)}
				</SubMenu>
			)
		}

		// 普通 hide=false title存在即可渲染
		if (!item.hide && item.title)
			return (
				<Item key={item?.key ?? item.path}>
					{item.path && <NavLink to={item.path}>{item.title}</NavLink>}
				</Item>
			)
	})
}
