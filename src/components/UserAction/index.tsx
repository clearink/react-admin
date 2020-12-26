import React, { Children, memo } from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/store"
import {
	Menu,
	Dropdown,
	Spin,
	Avatar,
	Badge,
	Typography,
	Divider,
	Descriptions,
	Space,
	Input,
	Button,
} from "antd"
import classNames from "classnames"
import {
	LogoutOutlined,
	MessageOutlined,
	UserOutlined,
} from "@ant-design/icons"
import LoginUtil from "@/utils/LoginUtil"
import GetBoundAction from "@/utils/GetBoundAction"
import { actions } from "@/store/reducers/user"

import "./style.scss"
import ModalTrigger from "../ModalTrigger"
import { FieldRadio, FieldText } from "../Pro/ProField"
import { Random } from "mockjs"

interface IProps {}

const BoundLogout = GetBoundAction(actions.logout)

// 基础头部
function UserAction(props: IProps) {
	const { user } = useSelector((state: AppState) => state.user)
	const handleLogout = () => {
		// 清除 token
		LoginUtil.clearToken()
		// 清除 store
		BoundLogout()
	}
	const menu = (
		<Menu>
			{/* <Menu.Item key='1'>
				<UserOutlined />
				个人中心
			</Menu.Item>
			<Menu.Item key='2'>
				<SettingOutlined />
				个人设置
			</Menu.Item>
			<Menu.Divider /> */}
			<Menu.Item key='3' onClick={handleLogout}>
				<LogoutOutlined />
				退出登录
			</Menu.Item>
		</Menu>
	)
	return (
		<div className='flex items-center'>
			<Dropdown
				placement='bottomCenter'
				trigger={["click"]}
				overlay={
					<div className='bg-white item_wrap'>
						<div className='px-10 py-4 bg-grey-600 title'>异常告警</div>
						{Array.from({ length: 10 }, (_, i) => {
							return (
								<div key={i} className={classNames("p-4 item")}>
									<div>
										<span className='name'>{Random.cname()}</span>
										<span>五楼 {Random.integer(100, 400)}房 02床</span>
									</div>
									<div className='flex items-center justify-between mt-4'>
										<span>离床超时</span>
										<ModalTrigger
											footer={null}
											width={640}
											trigger={
												<span className='underline cursor-pointer link'>
													处理告警
												</span>
											}
										>
											{({ toggle }: any) => (
												<div>
													<div className='flex items-center justify-between'>
														<Avatar icon={<UserOutlined />} size={90} />
														<div className='user_name flex flex-col'>
															<span className='block text-3xl font-bold mb-4 text-center'>
																{Random.cname()}
															</span>
															<span className='text-2xl text-center'>
																{Random.boolean() ? "男" : "女"}
																&nbsp;&nbsp;&nbsp;{Random.integer(60, 80)}岁
															</span>
														</div>
														<div
															className='flex flex-col flex-auto text-gray-700'
															style={{ fontSize: "18px" }}
														>
															<span>入住床位: 五楼-507房-022床</span>
															<span>
																护管人员:
																<Typography.Text copyable>
																	{Random.cname()}（17712345678）
																</Typography.Text>
															</span>
															<span>
																家属联系:
																<Typography.Text copyable>
																	{Random.cname()}（18012345678）
																</Typography.Text>
															</span>
														</div>
													</div>
													<Divider />
													<div>
														<Descriptions column={1}>
															<Descriptions.Item
																label={
																	<Space>
																		<UserOutlined />
																		告警信息
																	</Space>
																}
															>
																离床超时
															</Descriptions.Item>
															<Descriptions.Item label='处理方式'>
																<FieldRadio
																	value='电话通知护管人员查看核实'
																	defaultValue='电话通知护管人员查看核实'
																	className='field_radio'
																	mode='edit'
																	options={[
																		"电话通知护管人员查看核实",
																		" 短信通知护管人员查看核实",
																		"已核实，已联系专业医护人员",
																		"误报，重新检测数据正常",
																		"误报，设备异常",
																	]}
																/>
															</Descriptions.Item>
															<Descriptions.Item label='处理备注'>
																<Input.TextArea
																	style={{ width: 400 }}
																	placeholder='请输入处理备注'
																	maxLength={100}
																	showCount
																	rows={4}
																/>
															</Descriptions.Item>
														</Descriptions>
														<div className='text-center'>
															<Space>
																<Button onClick={toggle as any}>
																	暂不处理
																</Button>
																<Button type='primary' onClick={toggle as any}>
																	处理提交
																</Button>
															</Space>
														</div>
													</div>
												</div>
											)}
										</ModalTrigger>
									</div>
								</div>
							)
						})}
					</div>
				}
			>
				<Badge count={28} className='mr-6 cursor-pointer'>
					<MessageOutlined style={{ fontSize: "24px" }} />
				</Badge>
			</Dropdown>
			<Dropdown overlay={menu}>
				<span className='header_action px-3 flex items-center cursor-pointer'>
					<Avatar className='mr-4' src={user?.avatar} alt='avatar' />
					<span>{user?.username ?? <Spin />}</span>
				</span>
			</Dropdown>
		</div>
	)
}
export default memo(UserAction)
