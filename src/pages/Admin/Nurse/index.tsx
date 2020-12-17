import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Avatar, Button, Form, Input, Select, Space, Table } from "antd"
import {
	DownloadOutlined,
	PlusOutlined,
	RestOutlined,
	SearchOutlined,
	ToTopOutlined,
	UserOutlined,
} from "@ant-design/icons"

// 护管管理

const columns = [
	{
		title: "头像",
      dataIndex: "avatar",
      width:80,
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "姓名",
		dataIndex: "name",
	},
	{
		title: "性别",
		dataIndex: "sex",
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
      title: "身份证号",
      width:200,
		dataIndex: "num",
	},
	{
		title: "联系电话",
		dataIndex: "phone",
	},
	{
		title: "职务",
		dataIndex: "job",
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
				<span>护理分配</span>
				<span>认证信息</span>
				<span>编辑</span>
				<span>删除</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 50 }, (_, i) => {
	return {
		key: i,
		avatar: i,
      name: "黎明",
      age:70,
		sex: i % 2 ? "男" : "女",
		num: "45002219820503****",
		phone: "18088888888",
		job: "普通护工",
		status: "正常",
	}
})
function Nurse() {
	return (
		<div className='h-full flex flex-col'>
			<div
				className={classNames(
					styles.filter_bar,
					"px-8 pt-8 bg-white flex justify-between items-start flex-col md:flex-row"
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
							<Input placeholder='选择房间' />
						</Form.Item>
					</Space>
				</Form>
				<Space className='mb-8 md:mb-0'>
					<Button type='primary'>
						<SearchOutlined />
						查询
					</Button>
					<Button>
						<RestOutlined />
						重置
					</Button>
				</Space>
			</div>

			<div
				className={classNames(styles.table_wrap, "mt-8 bg-white p-8 flex-auto")}
			>
				<Space className='mb-10'>
					<Button type='primary'>
						<PlusOutlined />
						新增护管
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
					scroll={{ x: 1300 }}
				/>
			</div>
		</div>
	)
}
export default memo(Nurse)
