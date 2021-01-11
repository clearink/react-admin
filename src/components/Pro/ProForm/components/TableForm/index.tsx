import { PlusOutlined } from "@ant-design/icons"
import { Button, Table } from "antd"
import { TableProps } from "antd/lib/table"
import React, { memo, ReactNode } from "react"
// table form

export interface TableFormProps<T = any> extends TableProps<T> {
	renderTitle?: (currentData: Array<T>, dom: ReactNode) => React.ReactNode
}
const columns: TableFormProps["columns"] = [
	{
		title: "id",
		dataIndex: "id",
	},
	{
		title: "title",
		dataIndex: "title",
	},
]

function TableForm(props: TableFormProps) {
	// const { columns, ...rest } = props5

	const TableTitle: TableFormProps["title"] = (currentData) => {
		return (
			<Button type='dashed' block icon={<PlusOutlined />}>
				新增
			</Button>
		)
	}
	return (
		<div>
			<Table
				{...props}
				rowKey='id'
				size='small'
				title={TableTitle}
				footer={() => (
					<Button type='dashed' block icon={<PlusOutlined />}>
						新增
					</Button>
				)}
				columns={columns}
				dataSource={[
					{ id: "123", title: "title" },
					{ id: "222", title: "title2" },
				]}
			/>
		</div>
	)
}

export default memo(TableForm)
