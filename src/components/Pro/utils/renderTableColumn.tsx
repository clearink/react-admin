import { isBoolean, isObject } from "@/utils/validate"
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
			read,
			edit,
			hideInTable,
			render: CR,
			...props
		} = data[i]
		// search
		if (search) {
			const searchProps = {
				key: props.dataIndex,
				label: title,
				name: props.dataIndex,
			}
			Object.assign(searchProps, fieldProps ?? {})
			if (!isBoolean(search)) {
				Object.assign(searchProps, search)
			}
			QFA.push([field, searchProps])
		}
		// read
		let readProps = { ...fieldProps }
		if (isObject(read)) Object.assign(readProps, read)
		const { ellipsis, copyable, request } = readProps as any
		const ProField = ProFieldMap[field ?? "text"] ?? FieldText
		let DOM = <ProField {...readProps} />
		const colElement: ProTableColumns = {
			title: () => <TitleTip title={{ title, tooltip }} />,
			render: (text, record, index) => {
				if (CR) return CR(text, record, index, TableAction)

				// request 属性
				if (request) {
					DOM = cloneElement(DOM, {
						// 是否自动请求? index === 0 并且 search = 不为空
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
		// 不在table中隐藏
		if (!hideInTable) columns.push(colElement)
	}
	return [columns, QFA]
}
