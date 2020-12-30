import { Tooltip } from "antd"
import React, { cloneElement } from "react"
import { TitleTip } from "../ProCard/components"
import { FieldText, ProFieldMap } from "../ProField"
import { ProFieldType, ProTableColumns, ProTableRef } from "../ProTable/type"

// 获取pro table 的 columns
export default function renderTableColumn<T extends object>(
	data: ProTableColumns<T>[],
	TableAction: ProTableRef
): [ProTableColumns<T>[], Array<[ProFieldType | undefined, object]>] {
	const columns: ProTableColumns<T>[] = []
	const QFA: Array<[ProFieldType | undefined, object]> = []
	for (let i = 0; i < data.length; i++) {
		const {
			title,
			tooltip,
			fieldProps,
			field,
			search,
			hideInTable,
			render: CR,
			...props
		} = data[i]
		// 处理query filter
		if (search) {
			const requiredProps = {
				key: props.dataIndex,
				label: title,
				name: props.dataIndex,
			}
			QFA.push([field, Object.assign(requiredProps, fieldProps ?? {})])
		}
		const { ellipsis, copyable, request } = fieldProps ?? {}
		const ProField = ProFieldMap[field ?? "text"] ?? FieldText
		let DOM = <ProField {...fieldProps} />
		const colElement: ProTableColumns = {
			title: () => <TitleTip title={{ title, tooltip }} />,
			render: (text, record, index) => {
				if (CR) return CR(text, record, index, TableAction)

				// request 属性
				if (request) {
					DOM = cloneElement(DOM, {
						// 什么是否自动请求? index === 0 并且 search = true
						request: Object.assign(request, { auto: !index && search }),
					})
				}
				// 有省略时,应当防止copyable的tooltips 干扰
				if (ellipsis) {
					return (
						<Tooltip title={text}>
							<span>
								{cloneElement(DOM, {
									copyable: copyable ? { tooltips: false } : null,
									style: { width: props.width },
									text,
								})}
							</span>
						</Tooltip>
					)
				}
				return cloneElement(DOM, { text })
			},
			...props,
		}
		if (!hideInTable) columns.push(colElement)
	}
	return [columns, QFA]
}
