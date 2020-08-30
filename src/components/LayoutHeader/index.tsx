import React from "react"
import { useSelector } from "react-redux"
import { StoreState } from "@/stores"
import { Menu, Dropdown } from "antd"
import Avatar from "antd/lib/avatar/avatar"
interface IProps {}
function LayoutHeader(props: IProps) {
	const { user } = useSelector((state: StoreState) => state.user)
	console.log(user)
	const menu = (
		<Menu>
			<Menu.Item key='1'>Clicking me will not close the menu.</Menu.Item>
			<Menu.Item key='2'>Clicking me will not close the menu also.</Menu.Item>
			<Menu.Item key='3'>Clicking me will close the menu.</Menu.Item>
		</Menu>
	)
	return (
		<div className='layout-header__content'>
			LayoutHeader
			<Dropdown overlay={menu}>
				<span className='header_action'>
					<Avatar className="rounded-full" size={30} src={user?.avatar} />
					<span>{user?.name}</span>
				</span>
			</Dropdown>
		</div>
	)
}
export default LayoutHeader
