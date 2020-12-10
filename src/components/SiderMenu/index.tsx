import React, { memo, useEffect, useState } from "react"
import { Menu, Layout } from "antd"
import logo from "@/assets/images/logo.png"
import { useLocation } from "react-router-dom"
import FindMenuOpenKeys from "@/utils/FindMenuOpenKeys"
import useTypedSelector from "@/hooks/useTypedSelector"
import GetBoundAction from "@/utils/GetBoundAction"
import RenderMenu from "./RenderMenu"
import { actions } from "@/store/reducers/menu"
import "./style.scss"

const boundToggle = GetBoundAction(actions.toggle)
function SiderMenu() {
	const [collapsedMenu, setCollapsedMenu] = useState(false)
	const { menu, collapsed } = useTypedSelector((state) => state.menu)
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState<string[]>([]) // 当前打开的菜单
	const [selectKeys, setSelectKeys] = useState<string[]>([]) // 当前选中的菜单

	// 切换路由时 重新设置 open keys
	useEffect(() => {
		const newKeys = FindMenuOpenKeys(menu, pathname)
		if (!collapsed) {
			setOpenKeys(newKeys)
		} else {
			setOpenKeys([])
		}
		setSelectKeys(newKeys)
	}, [pathname, collapsed, menu])

	// 防止子菜单意外出现在别的位置
	// 和 collapsed 的更新不在同一个事件循环
	useEffect(() => {
		setCollapsedMenu(collapsed)
	}, [collapsed])
	return (
		<>
			<div
				className='sider-menu__placeholder'
				style={{ flexBasis: collapsed ? "48px" : "20rem" }}
			/>
			<Layout.Sider
				collapsible
				collapsedWidth={48}
				collapsed={collapsedMenu}
				onCollapse={boundToggle}
				breakpoint='md'
				className='sider-menu__wrap'
			>
				<div className='logo'>
					<img src={logo} alt='logo' />
					{!collapsed && <span>clear ink</span>}
				</div>
				<Menu
					onOpenChange={setOpenKeys as any} // 点击事件
					className='menu'
					mode='inline'
					theme='dark'
					openKeys={openKeys}
					selectedKeys={selectKeys}
				>
					{RenderMenu(menu)}
				</Menu>
			</Layout.Sider>
		</>
	)
}

export default memo(SiderMenu)
