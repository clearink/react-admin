import React, { memo, useLayoutEffect, useState } from "react"
import { Menu, Layout } from "antd"
import logo from "@/assets/images/logo.png"
import useBoolean from "@/hooks/useBoolean"
import { useLocation } from "react-router-dom"
import RenderMenu from "@/utils/RenderMenu"
import FindMenuOpenKeys from "@/utils/FindMenuOpenKeys"
import { IRoute } from "@/@types/route"

interface IProps {
	menuConfig?: IRoute[]
}

function SiderMenu(props: IProps) {
	const { menuConfig } = props
	const [collapsed, toggle] = useBoolean(false)
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState(() =>
		FindMenuOpenKeys(menuConfig as IRoute[], pathname)
	)

	// 切换 路由时重新设置 open keys
	useLayoutEffect(() => {
		if (!collapsed) {
			setOpenKeys(FindMenuOpenKeys(menuConfig as IRoute[], pathname))
		}
	}, [pathname, collapsed, menuConfig])

	// 点击事件
	const handleMenuChange = (keys: string[]) => {
		setOpenKeys(keys)
	}

	const handleToggleMenu = () => {
		setOpenKeys([])
		toggle()
	}
	return (
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
				selectedKeys={[pathname]}
			>
				{RenderMenu(menuConfig)}
			</Menu>
		</Layout.Sider>
	)
}

export default memo(SiderMenu)
