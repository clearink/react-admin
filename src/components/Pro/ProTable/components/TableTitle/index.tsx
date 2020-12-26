import React, { memo, useCallback, useContext } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import useDeepMemo from "@/hooks/useDeepMemo"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { isString } from "@/utils/validate"
import { ProTableProps } from "../../type"
import ProTableContext from "../../ProTableContext"
import { Alert, Button, Space } from "antd"
import {
	DownloadOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons"
import { actions } from "../../reducer"

interface TableTitleProps {
	title?: ProTableProps<any>["title"]
	extra: React.ReactNode
}
function TableTitle(props: TableTitleProps) {
	const { title, extra } = props
	const { state, dispatch } = useContext(ProTableContext)

	const TT = useDeepMemo(() => {
		if (isString(title)) return <TitleTip title={title} />
		return <TitleTip title={title?.title} tooltip={title?.tooltip} />
	}, [title])

	const BT = (() => {
		const SL = state.selectedRows.length
		return (
			<div className={styles.banner_title}>
				<span
					className={classNames(styles.selected_info, {
						hidden: SL === 0,
					})}
				>
					已选择
					<span className={styles.number}>{SL}</span>条
					<span
						className={styles.clear_select}
						onClick={() => dispatch?.(actions.changeSelectedRows([]))}
					>
						清空
					</span>
				</span>
				<div className={styles.extra}>
					<span>
						共计
						<span className={styles.number}>{state.total}</span>
						条数据
					</span>
					<span className='ml-4'>
						当前第
						<span className={styles.number}>{state.current}</span>页
					</span>
				</div>
			</div>
		)
	})()

	return (
		<>
			<div className={styles.title_header}>
				<div className={styles.title}>{TT}</div>
				<div className={styles.extra}>{extra}</div>
			</div>
			<Alert banner message={BT} showIcon type='info' />
		</>
	)
}
export default memo(TableTitle)

/**
 * /* 渲染出 tableHeader
	外部暴露出一个 renderTitle(dom, data, action)
	*/

// title tooltip
// const TT = useDeepMemo(() => {
// 	if (isString(title)) return <TitleTip title={title} />
// 	return <TitleTip title={title?.title} tooltip={title?.tooltip} />
// }, [title])

// const BT = (() => {
// 	const SL = reducerState.selectedRows.length
// 	return (
// 		<div className={styles.banner_title}>
// 			<span
// 				className={classNames(styles.selected_info, {
// 					hidden: SL === 0,
// 				})}
// 			>
// 				已选择
// 				<span className={styles.number}>{SL}</span>条
// 				<span
// 					className={styles.clear_select}
// 					onClick={() => dispatch(actions.changeSelectedRows([]))}
// 				>
// 					清空
// 				</span>
// 			</span>
// 			<div className={styles.extra}>
// 				<span>
// 					共计
// 					<span className={styles.number}>{reducerState.total}</span>
// 					条数据
// 				</span>
// 				<span className='ml-4'>
// 					当前第
// 					<span className={styles.number}>{reducerState.current}</span>页
// 				</span>
// 			</div>
// 		</div>
// 	)
// })()

// const tableTitle = (() => {
// 	const DOM = (
// 		<>
// 			<div className={styles.title_header}>
// 				<div className={styles.title}>{TT}</div>
// 				<div className={styles.extra}>
// 					<Space>
// 						<Button
// 							type='primary'
// 							icon={<PlusOutlined />}
// 							onClick={() => setCC((p) => p + 1)}
// 						>
// 							新增数据
// 						</Button>
// 						<Button icon={<DownloadOutlined />}>导入数据</Button>
// 						<Button icon={<ToTopOutlined />}>导出数据</Button>
// 						<ReloadOutlined onClick={reload} />
// 					</Space>
// 				</div>
// 			</div>
// 			<Alert banner message={BT} showIcon type='info' />
// 		</>
// 	)
// 	// 外部渲染

// 	return (
// 		<div className={styles.table_toolbar_wrap}>
// 			{renderTitle?.(reducerState, dispatch, actions) ?? DOM}
// 		</div>
// 	)
// })()
