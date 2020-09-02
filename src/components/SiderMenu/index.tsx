import React, { useState } from "react"
import { Menu, Button, Layout } from "antd"
import logo from "@/assets/images/logo.png"
import {
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
	AppstoreOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons"
interface IProps {}

const { Item, SubMenu } = Menu
function SiderMenu(props: IProps) {
	// const [collapsed, toggle] = useBoolean()
	const [collapsed, toggle] = useState(false)
	console.log(collapsed)
	return (
		<Layout.Sider collapsed={collapsed} className='sider-menu__wrap'>
			<div className='logo'>
				<img src={logo} alt='logo' />
				<span>clear ink</span>
			</div>
			<Menu
				className='menu'
				mode='inline'
				theme='dark'
			>
				<SubMenu key='dashboard'>工作台</SubMenu>
				<Menu.Item key='1' icon={<PieChartOutlined />}>
					工作台
				</Menu.Item>
				<Menu.Item key='2' icon={<DesktopOutlined />}>
					Option 2
				</Menu.Item>
				<Menu.Item key='3' icon={<ContainerOutlined />}>
					Option 3
				</Menu.Item>
				<SubMenu key='sub1' icon={<MailOutlined />} title='Navigation One'>
					<Menu.Item key='5'>Option 5</Menu.Item>
					<Menu.Item key='6'>Option 6</Menu.Item>
					<Menu.Item key='7'>Option 7</Menu.Item>
					<Menu.Item key='8'>Option 8</Menu.Item>
				</SubMenu>
				<SubMenu key='sub2' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>
				<SubMenu key='sub3' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>{" "}
				<SubMenu key='sub4' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>{" "}
				<SubMenu key='sub5' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>{" "}
				<SubMenu key='sub6' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>{" "}
				<SubMenu key='sub7' icon={<AppstoreOutlined />} title='Navigation Two'>
					<Menu.Item key='9'>Option 9</Menu.Item>
					<Menu.Item key='10'>Option 10</Menu.Item>
					<SubMenu key='sub3' title='Submenu'>
						<Menu.Item key='11'>Option 11</Menu.Item>
						<Menu.Item key='12'>Option 12</Menu.Item>
					</SubMenu>
				</SubMenu>
			</Menu>
			<div className='menu_collapsed__wrap'>
				<Button type='link' onClick={() => toggle((p) => !p)}>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuUnfoldOutlined />}
				</Button>
			</div>
		</Layout.Sider>
	)
}

export default SiderMenu
