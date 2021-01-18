import React, { memo, useContext } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { ProTableProps } from "../type"
import { Alert } from "antd"
import { ProTableServiceContext } from "../useProTable.service"

interface TableTitleProps {
	title?: ProTableProps<any>["title"]
	extra: React.ReactNode
}
function TableTitle(props: TableTitleProps) {
	const { title, extra } = props
	const { state, methods } = useContext(ProTableServiceContext)

	const BT = (() => {
		const SL = state.rows.length
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
						onClick={() => methods?.setRows([])}
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
				<div className={styles.title}>
					<TitleTip title={title} />
				</div>
				<div className={styles.extra}>{extra}</div>
			</div>
			<Alert banner message={BT} showIcon type='info' />
		</>
	)
}
export default memo(TableTitle)
