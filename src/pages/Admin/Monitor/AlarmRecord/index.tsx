import { ReloadOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Form, Input, Select, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { memo } from "react"
import styles from "./style.module.scss"

// 告警记录
export const alarmColumns = [
	{
		title: "标识",
		dataIndex: "avatar",
		width:80,
		key: "avatar",
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "告警用户",
		dataIndex: "user",
	},
	{
		title: "告警类型",
		width:300,
		dataIndex: "type",
	},
	{
		title: "告警时间",
		dataIndex: "time",
	},
	{
		title: "持续时长",
		dataIndex: "duration",
	},
	{
		title: "护管人员",
		dataIndex: "nurse",
	},
	{
		title: "处理状态",
		dataIndex: "status",
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 250,
		render: () => (
			<Space>
				<span>处理设置</span>
				<span>设备详情</span>
				<span>编辑</span>
				<span>停护</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 40 }, (_, i) => {
	return {
		key:i,
		avatar: i,
		user: "李小明",
		type: "离床超时,心率异常,呼吸率异常,体动频繁,围栏越界,血氧含量低",
		time: "2020/12/02 23:24",
		duration: "00:12:35",
		nurse: "万小川",
		status: "已处理",
	}
})
function AlarmRecord() {
	const [form] = Form.useForm()
	return (
		<div className='h-full flex flex-col'>
			<div className={styles.search_bar}>
				<Form layout='inline' form={form}>
					<Form.Item name='name'>
						<Input placeholder='姓名' />
					</Form.Item>
					<Form.Item name='floor'>
						<Select
							className={styles.select}
							placeholder='选择楼层'
							options={Array.from({ length: 10 }, (_, i) => ({
								label: i,
								value: i,
							}))}
						/>
					</Form.Item>
					<Form.Item name='room'>
						<Select
							className={styles.select}
							placeholder='选择房间'
							options={Array.from({ length: 10 }, (_, i) => ({
								label: i,
								value: i,
							}))}
						/>
					</Form.Item>
					<Form.Item name='alarm'>
						<Select
							placeholder='告警类型'
							className={styles.select}
							options={Array.from({ length: 10 }, (_, i) => ({
								label: i,
								value: i,
							}))}
						/>
					</Form.Item>
				</Form>
				<Space>
					<Button type='primary' icon={<SearchOutlined />}>
						查询
					</Button>
					<Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>
						重置
					</Button>
				</Space>
			</div>
			<main className={styles.content}>
				<Table
					bordered
					rowSelection={{
						selectedRowKeys: [],
						onChange: () => {},
					}}
					columns={alarmColumns}
					dataSource={data}
					scroll={{ x: 1400 }}
				/>
			</main>
		</div>
	)
}
export default memo(AlarmRecord)
