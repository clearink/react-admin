import React, { memo, useMemo, useRef, useState } from "react"
import { Button, Space } from "antd"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { TextProps } from "antd/lib/typography/Text"
import classNames from "classnames"
import styles from "./style.module.scss"
import { EditFormRef } from "@/components/BigSight/Form/EditForm"
import { AddFormRef } from "@/components/BigSight/Form/AddForm"
import NurseAddForm from "./components/add"
import NurseEditForm from "./components/edit"
import NurseApi from "@/http/api/pages/NurseApi"
import { EditOutlined } from "@ant-design/icons"
import { FieldAvatar, FieldStatus, FieldText } from "@/components/Pro/ProField"
import { ProFormInput } from "@/components/Pro/ProForm"

// 护管管理

const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		width: 80,
		dataIndex: "avatar",
		read: <FieldAvatar />,
	},
	{
		title: "姓名",
		width: 140,
		dataIndex: "name",
		read: <FieldText copyable />,
		search: (
			<ProFormInput
				placeholder='姓名/手机'
				label={undefined}
				name='nameOrMobile'
			/>
		),
	},
	{
		title: "性别",
		dataIndex: "gender",
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "身份证号",
		width: 200,
		dataIndex: "cardNum",
		read: <FieldText copyable ellipsis />,
	},
	{
		title: "联系电话",
		dataIndex: "mobile",
		read: <FieldText copyable />,
	},
	{
		title: "职务",
		dataIndex: "position",
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		read: <FieldStatus renderType='badge' statusList={colorArray} />,
		fieldProps: {
			options: [
				{ label: "正常", value: true },
				{ label: "离职", value: false },
			],
		},
	},
]
function Nurse() {
	const [editId, setEditId] = useState<string | undefined>(undefined)
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)

	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			dataIndex: "id",
			width: 300,
			render: (dom, id) => (
				<Space>
					<span>护理分配</span>
					<span>认证信息</span>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setEditId(id)
							editRef.current?.toggle()
						}}
						type='link'
					>
						编辑
					</Button>
				</Space>
			),
		})
	}, [])
	return (
		<div className='h-full flex flex-col'>
			<ProTable
				ref={tableRef}
				request={{
					url: "/orgmgt/careWorker/list",
					method: "post",
					transform: bsConvertTableList,
				}}
				columns={tableColumns}
				rowKey='id'
				// 搜索请求
				onSearch={formatTableSearchParams}
				// 删除
				onDelete={async (values) => {
					await NurseApi.remove({ ids: values })
				}}
				// transform 需要设置 当前页数,pageSize, 总数 数据
				title={{ title: "护管管理", tooltip: "护工人员管理" }}
				onCreate={() => {
					addRef.current?.toggle()
				}}
			/>
			<NurseAddForm
				ref={addRef}
				title='新增护管'
				onFinish={async (values) => {
					await NurseApi.add(values)
					tableRef.current?.reload()
					return true
				}}
			/>
			<NurseEditForm
				ref={editRef}
				title='编辑护管'
				id={editId}
				onFinish={async (values) => {
					await NurseApi.edit(values)
					tableRef.current?.reload()
					// 清除 editId
					setEditId(undefined)
					return true
				}}
			/>
		</div>
	)
}
export default memo(Nurse)
