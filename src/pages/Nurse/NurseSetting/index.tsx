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
import NurseSettingAddForm from "./components/add"
import NurseSettingEditForm from "./components/edit"
import NurseSettingApi from "@/http/api/pages/NurseSettingApi"
import { EditOutlined } from "@ant-design/icons"
import { FieldMoney, FieldStatus, FieldText } from "@/components/Pro/ProField"

// 护管管理

const columns: ProTableColumns<any>[] = [
	{
		title: "方案名称",
		width: 80,
		dataIndex: "name",
	},
	{
		title: "当前状态",
		width: 100,
		dataIndex: "enabled",
		read: (
			<FieldStatus
				renderType='badge'
				options={[
					{ label: "启用", value: true },
					{ label: "停用", value: false },
				]}
				statusList={colorArray}
			/>
		),
	},
	{
		title: "方案简介",
		dataIndex: "introduction",
		width: 600,
		read: <FieldText ellipsis />,
	},
	{
		title: "定价参考(元)",
		dataIndex: "price",
		width: 100,
		read: <FieldMoney />,
	},
]
function NurseSetting() {
	const [editId, setEditId] = useState<string | undefined>(undefined)
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)

	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			dataIndex: "id",
			width: 100,
			render: (dom, id) => (
				<Space>
					<Button
						size='small'
						icon={<EditOutlined />}
						onClick={() => {
							setEditId(id)
							editRef.current?.toggle()
						}}
						type='link'
					>
						护理详情
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
					url: "/orgmgt/carePlan/list",
					method: "get",
					params: { pageNo: 1, pageSize: 10 },
					transform: bsConvertTableList,
				}}
				columns={tableColumns}
				rowKey='id'
				// 搜索请求
				search={false}
				onSearch={formatTableSearchParams}
				// 删除
				onDelete={async (values) => {
					await NurseSettingApi.remove({ ids: values })
				}}
				// title={{ title: "护管管理", tooltip: "护工人员管理" }}
				onCreate={() => {
					addRef.current?.toggle()
				}}
				renderAction={(dom) => {
					return [dom[0], dom[1], dom[4]]
				}}
			/>
			<NurseSettingAddForm
				ref={addRef}
				title='新增护理方案'
				onFinish={async (values) => {
					await NurseSettingApi.add(values)
					tableRef.current?.reload()
					return true
				}}
			/>
			<NurseSettingEditForm
				ref={editRef}
				title='编辑护理方案'
				id={editId}
				onFinish={async (values) => {
					await NurseSettingApi.edit(values)
					tableRef.current?.reload()
					// 清除 editId
					setEditId(undefined)
					return true
				}}
			/>
		</div>
	)
}
export default memo(NurseSetting)
