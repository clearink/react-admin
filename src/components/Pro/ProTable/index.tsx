import React, { forwardRef, memo, Ref, useImperativeHandle } from "react"
import { Button, Space, Table } from "antd"
import classNames from "classnames"
import { ColumnsType } from "antd/lib/table"
import { ProTableProps, ProTableRef } from "./type"
import { QueryFilter } from "../ProForm"
import styles from "./style.module.scss"
import withDefaultProps from "@/hocs/withDefaultProps"
import TableTitle from "./TableTitle"
import {
	DeleteOutlined,
	DownloadOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons"
import useProTableService, {
	ProTableServiceContext,
} from "./useProTable.service"

/**
 */

function ProTable<T extends object>(
	props: ProTableProps<T>,
	ref: Ref<ProTableRef>
) {
	const {
		onSearch,
		search,
		columns: PCol,
		loading: PLoading,
		request,
		dataSource: PDataSource,
		title,
		renderAction,
		renderTitle,
		onCreate,
		formRef,
		...rest
	} = props
	const tableService = useProTableService(props)
	useImperativeHandle(formRef, () => tableService.form, [tableService.form])
	useImperativeHandle(
		ref,
		() => ({
			...tableService.action,
			form: tableService.form,
		}),
		[tableService.action, tableService.form]
	)

	const tableTitleExtra = (() => {
		const actions = [
			<Button
				type='primary'
				danger
				className={classNames({ hidden: !tableService.state.rows.length })}
				onClick={tableService.handleDelete}
				icon={<DeleteOutlined />}
				key='delete'
			>
				删除数据
			</Button>,
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={onCreate}
				key='add'
			>
				新增数据
			</Button>,
			<Button key='import' icon={<DownloadOutlined />}>
				导入数据
			</Button>,
			<Button key='export' icon={<ToTopOutlined />}>
				导出数据
			</Button>,
			<ReloadOutlined key='reload' onClick={tableService.fetchData} />,
		]
		if (renderAction) return renderAction(actions)
		return actions
	})()

	return (
		<ProTableServiceContext.Provider value={tableService as any}>
			<div className={styles.pro_table_wrap}>
				{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
				<QueryFilter
					{...search}
					form={tableService.form}
					name='table-query-filter'
					loading={tableService.state.loading}
					className={classNames({ hidden: !search })}
					submitConfig={{
						resetProps: {
							onClick: tableService.action.reset,
						},
					}}
					onFinish={tableService.handleSearch}
				>
					{tableService.searchList}
				</QueryFilter>
				<div className='bg-white'>
					{renderTitle?.(
						tableService.state,
						tableService.methods,
						tableTitleExtra
					) ?? (
						<div className={styles.table_toolbar_wrap}>
							<TableTitle
								title={title}
								extra={<Space>{tableTitleExtra}</Space>}
							/>
						</div>
					)}

					<Table
						showSorterTooltip={false}
						loading={tableService.state.loading}
						{...rest}
						className={classNames("px-10 bg-white", rest.className)}
						dataSource={tableService.state.data}
						columns={tableService.columns as ColumnsType<any>}
						rowSelection={tableService.rowSelection}
						// 分页
						pagination={{
							current: tableService.state.current,
							total: tableService.state.total,
							pageSize: tableService.state.pageSize,
						}}
						// 同样改变 params
						onChange={tableService.handleTableChange}
					/>
				</div>
			</div>
		</ProTableServiceContext.Provider>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProTable), {
		search: true,
		bordered: true,
		size: "middle",
		rowKey: "key",
	})
)
