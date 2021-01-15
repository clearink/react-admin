import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { AddForm } from "@/components/BigSight"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Space, Table } from "antd"
import { ColumnsType, TableProps } from "antd/lib/table"
import renderColumn from "./renderColumn"
import { TableFormColumns } from "./interface"
import { AddFormRef } from "@/components/BigSight/Form/AddForm"
import { EditFormProps, EditFormRef } from "@/components/BigSight/Form/EditForm"
import { AddFormProps } from "@/components/BigSight/Field/Detail"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import withFormItem from "@/components/Pro/hocs/withFormItem"
// table form

/** 暴露的属性
 * 1. add
 * 2. edit
 * 3. 自定义的render
 */
export interface TableFormProps<T extends object = any>
	extends Omit<TableProps<T>, "columns" | "onChange" | "dataSource"> {
	columns?: TableFormColumns<T>[]
	addType?: AddFormProps["type"]
	editType?: EditFormProps["type"]
	onChange?: (newList: Array<T>) => void
	value?: Array<T>
}

function TableForm<T extends object = any>(props: TableFormProps<T>) {
	const { columns, addType, editType, value, onChange, rowKey, ...rest } = props
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const [list, setList] = useState<Array<T>>(() => value ?? [])

	const handleChange = useMemoCallback(
		(newList: Array<T>) => onChange?.(newList),
		[]
	)
	useEffect(() => {
		handleChange(list)
	}, [list, handleChange])

	const TableAdd: TableFormProps["title"] = (currentData) => {
		return (
			<Button
				type='dashed'
				block
				icon={<PlusOutlined />}
				onClick={() => addRef.current?.toggle()}
			>
				新增
			</Button>
		)
	}
	const [_tableColumns, formColumns] = useMemo(() => renderColumn(columns), [
		columns,
	])
	const handleAddSubmit = useCallback(async (values) => {
		setList((p) => p.concat(values))
		return true
	}, [])

	const tableColumns = useMemo(
		() =>
			_tableColumns?.concat({
				title: "操作",
				key: "table-form-action",
				render: (_, record) => {
					return (
						<Space>
							<Button
								type='link'
								size='small'
								onClick={() => {
									editRef.current?.form.setFieldsValue(record)
									editRef.current?.toggle()
								}}
							>
								编辑
							</Button>
							<Button
								type='link'
								danger
								size='small'
								onClick={() => {
									setList((p) => p.filter((item) => item !== record))
								}}
							>
								删除
							</Button>
						</Space>
					)
				},
			}),
		[_tableColumns]
	)

	return (
		<div>
			<Table
				{...rest}
				rowKey={rowKey}
				size='small'
				footer={TableAdd}
				columns={tableColumns as ColumnsType<any>}
				dataSource={list}
			/>
			<AddForm
				type={addType}
				ref={addRef}
				onFinish={handleAddSubmit}
				children={formColumns}
			/>
			<AddForm type={editType} ref={editRef} children={formColumns} />
		</div>
	)
}

export default withFormItem<TableFormProps>(TableForm, { rowKey: "id" })
