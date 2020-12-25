import { FieldAvatarProps } from "@/components/Pro/ProField/components/FieldAvatar"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"
import { ReloadOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Form, Input, Select, Space, Table } from "antd"
import MOCK, { Random } from "mockjs"
import React, { memo } from "react"
import styles from "./style.module.scss"

// 告警记录
export const alarmColumns = [
	{
		title: "标识",
		dataIndex: "avatar",
		width: 80,
		key: "avatar",
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "告警用户",
		dataIndex: "user",
		search: true,
	},
	{
		title: "告警类型",
		width: 300,
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
const alarmArray = "离床超时,心率异常,呼吸率异常,体动频繁,围栏越界,血氧含量低".split(
	","
)
const data = Array.from({ length: 40 }, (_, i) => {
	return {
		key: i,
		avatar: "i",
		user: MOCK.Random.cname(),
		type: alarmArray[MOCK.Random.integer(0, 5)],
		time: Random.date(),
		duration: "00:12:35",
		nurse: MOCK.Random.cname(),
		status: MOCK.Random.boolean() ? "已处理" : "未处理",
	}
})
const columns: ProTableColumns<any>[] = [
	{
		title: "标识",
		dataIndex: "avatar",
		field: "avatar",
		fieldProps: {
			size: 30,
			icon: <UserOutlined />,
		} as FieldAvatarProps,
	},
	{
		title: "告警用户",
		search: true,
		dataIndex: "user",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "告警类型",
		dataIndex: "type",
		field: "select",
		search: true,
		fieldProps: {
			fieldEnum: colorArray,
			options: alarmArray,
		},
	},
	{
		title: "告警时间",
		dataIndex: "time",
		field: "date",
	},
	{
		title: "持续时长",
		dataIndex: "duration",
	},
	{
		title: "护管人员",
		dataIndex: "nurse",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "处理状态",
		dataIndex: "status",
		field: "select",
		fieldProps: {
			fieldEnum: colorArray,
			options: ["已处理", "未处理"],
		},
	},
	{
		title: "操作",
		key: "action",
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
function AlarmRecord() {
	const [form] = Form.useForm()
	return (
		<div className='h-full flex flex-col'>
			<ProTable dataSource={data} columns={columns} />
			{/* <div className={styles.search_bar}>
				<Form form={form}>
					<Space>
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
					</Space>
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
					// 贼耗性能
					// scroll={{ x: 1400 }}
				/>
			</main>
	 */}
		</div>
	)
}
export default memo(AlarmRecord)
