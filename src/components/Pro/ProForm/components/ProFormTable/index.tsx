import React, {
	forwardRef,
	Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react"
import { AddForm } from "@/components/BigSight"
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import renderColumn from "./renderColumn"
import { TableFormProps, TableFormRef } from "./interface"
import { AddFormRef } from "@/components/BigSight/Form/AddForm"
import { EditFormRef } from "@/components/BigSight/Form/EditForm"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import withFormItem from "@/components/Pro/hocs/withFormItem"
// table form

/** 暴露的属性
 * 1. add
 * 2. edit
 * 3. 自定义的render
 */
function TableForm<T extends object = any>(
	props: TableFormProps<T>,
	ref: Ref<TableFormRef<T>>
) {
	const { columns, addType, editType, value, onChange, rowKey, ...rest } = props
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const [update, setUpdate] = useState<T | null>(null)
	const [list, setList] = useState<Array<T>>(() => value ?? [])

	const handleChange = useMemoCallback(
		(newList: Array<T>) => onChange?.(newList),
		[]
	)
	useEffect(() => {
		handleChange(list)
	}, [list, handleChange])

	const TableAdd = () => {
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
	const TableEdit = (record: T) => {
		setUpdate(record)
		editRef.current?.form.setFieldsValue(record)
		editRef.current?.toggle()
	}
	const TableDelete = (record: T) => {
		setList((p) => p.filter((item) => item !== record))
	}

	const action = useMemo(
		() => ({
			add: () => addRef.current?.toggle(),
			edit: TableEdit,
			delete: TableDelete,
		}),
		[]
	)
	// 暴露的方法
	useImperativeHandle(ref, () => action, [action])
	const [_tableColumns, formColumns] = useMemo(
		() => renderColumn(columns ?? [], action),
		[columns, action]
	)

	const handleAddSubmit = useCallback(async (values: T) => {
		setList((p) => p.concat(values))
		return true
	}, [])
	const handleEditSubmit = async (values: T) => {
		const newList = list.map((item) => {
			if (item === update) return { ...item, ...values }
			return item
		})
		setList(newList)
		setUpdate(null)
		return true
	}

	const tableColumns = useMemo(() => {
		const hasCustomAction = _tableColumns.find((item) => item.key === "action")
		if (hasCustomAction) return _tableColumns
		return _tableColumns.concat({
			title: "操作",
			key: "action",
			render: (_, text, record) => {
				return (
					<>
						<Button
							type='link'
							size='small'
							icon={<EditFilled />}
							onClick={() => TableEdit(record)}
						>
							编辑
						</Button>
						<Popconfirm
							title='确定删除吗?'
							onConfirm={() => TableDelete(record)}
						>
							<Button danger size='small' type='link' icon={<DeleteFilled />}>
								删除
							</Button>
						</Popconfirm>
					</>
				)
			},
		})
	}, [_tableColumns])

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
			{/* 新增form */}
			<AddForm
				type={addType}
				ref={addRef}
				onFinish={handleAddSubmit}
				children={formColumns}
			/>
			{/* 修改 form */}
			<AddForm
				type={editType}
				ref={editRef}
				children={formColumns}
				onFinish={handleEditSubmit}
			/>
		</div>
	)
}
export default withFormItem<TableFormProps>(forwardRef(TableForm), {
	rowKey: "id",
})
