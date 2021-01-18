import { FieldText } from "@/components/BigSight"
import { TitleTip } from "@/components/Pro/components"
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Popconfirm, Tooltip } from "antd"
import { ColumnType } from "antd/lib/table"
import React, { cloneElement, ComponentType, isValidElement } from "react"
import { TableFormColumns, TableFormRef } from "./interface"
export default function renderColumn(
	columns: TableFormColumns[],
	action: TableFormRef
) {
	const tableColumns: TableFormColumns[] = []
	const editList: JSX.Element[] = []
	for (let i = 0; i < columns.length; i++) {
		const col = columns[i]
		const {
			read,
			edit,
			fieldProps,
			render,
			title,
			tooltip,
			hideInTable,
			...rest
		} = col

		// edit and add form item list
		if (edit) {
			let editProps = {
				name: col.dataIndex,
				label: col.title,
				key: col.dataIndex,
				...fieldProps,
			}
			if (isValidElement(edit)) {
				// 合法的 Element
				editList.push(
					cloneElement(edit, { ...editProps, ...(edit.props as any) })
				)
			} else {
				const Edit = edit as ComponentType<any>
				editList.push(<Edit {...editProps} />)
			}
		}

		const { request } = fieldProps ?? {}
		let readElement = <FieldText /> // 默认是 fieldText
		if (isValidElement(read)) {
			readElement = cloneElement(read, { ...fieldProps })
		} else if (read) {
			const Read = read as ComponentType<any>
			readElement = <Read {...fieldProps} />
		}

		const tableColumn: ColumnType<any> = {
			...rest,
			title: () => <TitleTip title={{ title, tooltip }} />,
			render: (text: any, record: any, index: number) => {
				let renderDom = cloneElement(readElement, { text })
				if (request) {
					const requestProps = { ...request, auto: !index }
					renderDom = cloneElement(renderDom, { request: requestProps })
				}

				if (renderDom.props.ellipsis) {
					renderDom = (
						<Tooltip title={text}>
							{cloneElement(renderDom, {
								style: { width: rest.width },
							})}
						</Tooltip>
					)
				}
				if (render) return render(renderDom, text, record, index, action)

				return cloneElement(renderDom, { text })
			},
		}

		if (!hideInTable) tableColumns.push(tableColumn)
	}

	return [tableColumns, editList] as const
}
