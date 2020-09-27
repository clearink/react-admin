import React, { memo, useLayoutEffect, useState } from "react"
import { Menu, Layout } from "antd"
import logo from "@/assets/images/logo.png"
import useBoolean from "@/hooks/useBoolean"
import { useLocation } from "react-router-dom"
import RenderMenu from "@/utils/RenderMenu"
import FindMenuOpenKeys from "@/utils/FindMenuOpenKeys"
import useTypedSelector from "@/hooks/useTypedSelector"

function SiderMenu() {
	const menu = useTypedSelector((state) => state.menu)
	const [collapsed, toggle] = useBoolean(false)
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState(() =>
		FindMenuOpenKeys(menu, pathname)
	)

	// 切换 路由时重新设置 open keys
	useLayoutEffect(() => {
		if (!collapsed) {
			setOpenKeys(FindMenuOpenKeys(menu, pathname))
		}
	}, [pathname, collapsed, menu])

	// 点击事件
	const handleMenuChange = (keys: string[]) => {
		setOpenKeys(keys)
	}

	const handleToggleMenu = () => {
		setOpenKeys([])
		toggle()
	}

	console.log("openKeys", openKeys)
	return (
		<>
			<div
				className='sider-menu__placeholder'
				style={{ flexBasis: collapsed ? "4.8rem" : "20rem" }}
			/>
			<Layout.Sider
				collapsedWidth={48}
				collapsed={collapsed}
				onCollapse={handleToggleMenu}
				collapsible
				className='sider-menu__wrap'
			>
				<div className='logo'>
					<img src={logo} alt='logo' />
					{!collapsed && <span>clear ink</span>}
				</div>
				<Menu
					onOpenChange={handleMenuChange as any}
					className='menu'
					mode='inline'
					theme='dark'
					defaultOpenKeys={openKeys}
					openKeys={openKeys}
					selectedKeys={openKeys}
				>
					{RenderMenu(menu)}
				</Menu>
			</Layout.Sider>
		</>
	)
}

export default memo(SiderMenu)
