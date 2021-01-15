import { isBoolean } from "@/utils/data/validate"
import { Tooltip } from "antd"
import React, { cloneElement, ComponentType, isValidElement } from "react"
import { TitleTip } from "../ProCard/components"
import { FieldText } from "../ProField"
import { ProFormInput } from "../ProForm"
import { ProTableColumns } from "./type"

// 获取pro table 的 columns
export default function renderTableColumn<T extends object>(
	data: ProTableColumns<T>[]
) {
	const columns: ProTableColumns<T>[] = []
	const searchList: Array<JSX.Element> = []
	for (let i = 0; i < data.length; i++) {
		const {
			title,
			tooltip,
			fieldProps,
			search: SearchComponent,
			read: ReadComponent,
			hideInTable,
			render,
			...props
		} = data[i]
		// search
		if (SearchComponent) {
			const searchProps = {
				label: title,
				name: props.dataIndex,
				key: props.dataIndex as React.Key,
				...fieldProps,
			}
			if (isValidElement(SearchComponent)) {
				searchList.push(
					cloneElement(SearchComponent, {
						...searchProps,
						...(SearchComponent.props as any),
					})
				)
			} else if (SearchComponent) {
				const SC = SearchComponent as ComponentType<any>
				searchList.push(<SC {...searchProps} />)
			}
		}
		// read
		const { request } = fieldProps ?? {}

		let DOM: JSX.Element = <FieldText /> // 默认是 FieldText
		if (isValidElement(ReadComponent)) {
			DOM = cloneElement(ReadComponent, {
				...fieldProps,
				...(ReadComponent.props as any),
			})
		} else if (ReadComponent) {
			const RC = ReadComponent as ComponentType<any>
			DOM = <RC {...fieldProps} />
		}
		const TableElement: ProTableColumns = {
			...props,
			title: () => <TitleTip title={{ title, tooltip }} />,
			render: (text, record, index) => {
				// request 属性
				let renderDom = cloneElement(DOM, { text })

				if (request) {
					const requestProps = { ...request, auto: !index }
					renderDom = cloneElement(renderDom, { request: requestProps })
				}
				// 有省略
				if (renderDom.props.ellipsis) {
					renderDom = (
						<Tooltip title={text}>
							{cloneElement(renderDom, {
								style: { width: props.width },
							})}
						</Tooltip>
					)
				}
				if (render) return render(renderDom, text, record, index)
				return renderDom
			},
		}
		// 不在table中隐藏
		if (!hideInTable) columns.push(TableElement)
	}
	return [columns, searchList] as const
}
