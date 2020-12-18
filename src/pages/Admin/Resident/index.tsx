import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import {
	Avatar,
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Space,
	Table,
} from "antd"
import {
	DownloadOutlined,
	PlusOutlined,
	RedoOutlined,
	SearchOutlined,
	ToTopOutlined,
	UserOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"

const columns = [
	{
		title: "头像",
		dataIndex: "avatar",
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "姓名",
		dataIndex: "name",
	},
	{
		title: "姓名",
		dataIndex: "sex",
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "入住楼层",
		dataIndex: "floor",
	},
	{
		title: "入住房间",
		dataIndex: "room",
	},
	{
		title: "住户手机",
		dataIndex: "phone",
	},
	{
		title: "紧急联系电话",
		dataIndex: "sosPhone",
	},
	{
		title: "账号状态",
		dataIndex: "status",
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 300,
		render: () => (
			<Space>
				<Link to='/resident/1'>住户详情</Link>
				<span>处理设置</span>
				<span>设备详情</span>
				<span>编辑</span>
				<span>停护</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 50 }, (_, i) => {
	return {
		key: i,
		avatar: 1,
		name: "李小萌",
		sex: "女",
		age: 88,
		floor: "主楼-一楼",
		room: "101",
		phone: "18088888888",
		sosPhone: "18088888888",
		status: "离院",
	}
})
function Resident() {
	return (
		<>
			<div
				className={classNames(
					styles.filter_bar,
					"bg-white pt-8 px-8 flex justify-between items-start flex-col lg:flex-row"
				)}
			>
				<Form>
					<Space>
						<Form.Item>
							<Input placeholder='姓名/手机' />
						</Form.Item>
						<Form.Item>
							<Select placeholder='选择楼层' />
						</Form.Item>
						<Form.Item>
							<Select placeholder='选择房间' />
						</Form.Item>
						<Form.Item>
							<Select placeholder='住户类型' />
						</Form.Item>
						<Form.Item>
							<DatePicker />
						</Form.Item>
					</Space>
				</Form>
				<Space className='mb-6 lg:mb-0'>
					<Button type='primary'>
						<SearchOutlined />
						查询
					</Button>
					<Button>
						<RedoOutlined />
						重置
					</Button>
				</Space>
			</div>
			<div className={classNames(styles.table_wrap, "mt-8 p-8 bg-white")}>
				<Space className='mb-10'>
					<Button type='primary'>
						<PlusOutlined />
						新增用户
					</Button>
					<Button>
						<DownloadOutlined />
						导入
					</Button>
					<Button>
						<ToTopOutlined />
						导出
					</Button>
				</Space>

				<Table
					bordered
					columns={columns}
					dataSource={data}
					// scroll={{ x: 1200 }}
				/>
			</div>
		</>
	)
}
export default memo(Resident)
