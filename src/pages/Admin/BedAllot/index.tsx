import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import {
	Button,
	Card,
	Form,
	Input,
	Popconfirm,
	Select,
	Space,
	Switch,
	Table,
	Tree,
} from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	UserOutlined,
} from "@ant-design/icons"
import ModalTrigger from "@/components/ModalTrigger"
import ProTable from "@/components/Pro/ProTable"
import { Random } from "mockjs"
import { ProTableColumns } from "@/components/Pro/ProTable/type"

const treeData = [
	{
		title: "主楼",
		key: "0-0",
		children: [
			{
				title: "一楼",
				key: "0-0-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-0-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-0-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "东翼副楼",
		key: "0-1",
		children: [
			{
				title: "一楼",
				key: "0-1-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-1-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-1-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "西翼副楼",
		key: "0-2",
		children: [
			{
				title: "一楼",
				key: "0-2-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-2-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-2-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "康复中心",
		key: "0-3",
		children: [
			{
				title: "一楼",
				key: "0-3-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-3-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-3-2",
				isLeaf: true,
			},
		],
	},
]
const columns: ProTableColumns<any>[] = [
	{
		title: "床位编号",
		width: 100,
		dataIndex: "num",
		search: true,
		fieldProps: {
			label: false,
			placeholder: "房间编号",
		},
	},
	{
		title: "入住用户",
		dataIndex: "user",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "护管人员",
		dataIndex: "nurse",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "床垫设备号",
		dataIndex: "mattress",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "开放状态",
		dataIndex: "open",
		render(value) {
			return <Switch defaultChecked={value} />
		},
	},
	{
		title: "床垫设备号",
		key: "action",
		fixed: "right" as "right",
		width: 250,
		render: () => {
			return (
				<Space>
					<span>
						<UserOutlined />
						住户信息
					</span>
					<span>
						<UserOutlined />
						编辑
					</span>
					<span>
						<DeleteOutlined />
						删除
					</span>
				</Space>
			)
		},
	},
]
const data = Array.from({ length: 10 }, (_, i) => {
	return {
		key: i,
		num: i,
		user: Random.cname(),
		nurse: Random.cname(),
		mattress: Random.string(8),
		open: Random.boolean(),
	}
})
function BedAllot() {
	return (
		<div className={styles.page_wrap}>
			<ProTable columns={columns} title='床位管理' bordered />
		</div>
	)
}
export default memo(BedAllot)
