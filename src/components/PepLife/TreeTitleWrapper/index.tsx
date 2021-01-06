import React, { memo, ReactNode } from "react"
import styles from "./style.module.scss"
import { DataNode } from "antd/lib/tree"
import { Popconfirm } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"

export interface TreeTitleWrapperProps extends DataNode {
	onCreate: (id: string) => void
	onEdit: (id: string) => void
	onDelete: (id: string) => void
	id: string
	title?: ReactNode
	isLeaf?: boolean
}
function TreeTitleWrapper(props: TreeTitleWrapperProps) {
	const { title, onCreate, onEdit, onDelete, id, isLeaf } = props
	return (
		<div className={styles.tree_title_wrap}>
			<span className={styles.tree_title}>{title}</span>
			<div
				className={styles.action}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<PlusOutlined onClick={() => onCreate(id)} />
				<EditOutlined onClick={() => onEdit(id)} />
				{isLeaf && (
					<Popconfirm title='确定删除?' onConfirm={() => onDelete(id)}>
						<DeleteOutlined />
					</Popconfirm>
				)}
			</div>
		</div>
	)
}
export default memo(TreeTitleWrapper)
