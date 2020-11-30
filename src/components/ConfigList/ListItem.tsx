import withDefaultProps from "@/hocs/withDefaultProps"
import { DeleteFilled, EditFilled, MinusCircleFilled } from "@ant-design/icons"
import { Popconfirm } from "antd"
import React, { memo, useContext, useMemo } from "react"
import { ConfigListContext } from "."
import styles from "./style.module.scss"
interface IProps {
	data: any[]
	config: {
		[key: string]: any
	}
}
// 用于 configList 预览的组件
function ListItem(props: IProps) {
	const { data, config } = props
	const { handleStartUpdate, handleDelete } = useContext<{
		handleStartUpdate: (item: Object) => {}
		handleDelete: (id: string | number) => {}
	}>(ConfigListContext)
	// 由 config 得到该显示哪些数据
	const dataKeys = useMemo(() => {
		return Object.entries(config).reduce((pre, [key, cur]) => {
			if (cur.hidden) return pre
			return pre.concat(key)
		}, [] as string[])
	}, [config])
	// 显示数据

	const renderChildren = useMemo(() => {
		return data.map((item, index) => (
			<div className={styles.item_list} key={item.id ?? index}>
				{dataKeys.map((key) => {
					return (
						<div className={styles.item} key={key}>
							{item[key] ?? "暂未设置"}
						</div>
					)
				})}
				<EditFilled
					onClick={() => handleStartUpdate(item)}
					className={styles.icon}
				/>
				<Popconfirm
					title='确认删除该数据吗?'
					onConfirm={() => handleDelete(item.id)}
				>
					<DeleteFilled className={styles.icon} />
				</Popconfirm>
			</div>
		))
	}, [dataKeys, data, handleDelete, handleStartUpdate])
	return <div className={styles.item_list_wrap}>{renderChildren}</div>
}

export default memo(
	withDefaultProps(ListItem, { data: [] as any[], config: {} })
)
