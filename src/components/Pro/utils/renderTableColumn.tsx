import { Tooltip } from "antd"
import React, { cloneElement, isValidElement } from "react"
import { TitleTip } from "../ProCard/components"
import { FieldText } from "../ProField"
import { ProFormInput } from "../ProForm"
import { ProTableColumns } from "../ProTable/type"

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
				key: i,
				label: title,
				name: props.dataIndex,
				...fieldProps,
			}
			if (SearchComponent === true) {
				searchList.push(<ProFormInput {...searchProps} />)
			} else if (isValidElement(SearchComponent)) {
				searchList.push(
					cloneElement(SearchComponent, {
						...searchProps,
						...(SearchComponent.props as any),
					})
				)
			}
		}

		// read
		const { ellipsis, copyable, request } = fieldProps ?? {}

		let DOM: JSX.Element = <FieldText {...fieldProps} />
		if (ReadComponent === true) {
			DOM = <FieldText {...fieldProps} />
		} else if (isValidElement(ReadComponent)) {
			DOM = cloneElement(ReadComponent, {
				...fieldProps,
				...(ReadComponent.props as any),
			})
		}
		const TableElement: ProTableColumns = {
			title: () => <TitleTip title={{ title, tooltip }} />,
			render: (text, record, index) => {
				if (render) return render(DOM, text, record, index)

				// request 属性
				if (request) {
					DOM = cloneElement(DOM, {
						// 是否自动请求? index === 0 并且 search = 不为空
						request: {
							...request,
							auto: !index && SearchComponent,
						},
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
		if (!hideInTable) columns.push(TableElement)
	}
	return [columns, searchList] as const
}
