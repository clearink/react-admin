import React, { memo } from "react"
import styles from "./style.module.scss"
import { DataNode } from "antd/lib/tree"
import { Popconfirm, Space } from "antd"
import ModalTrigger from "@/components/ModalTrigger"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"

function TreeTitleWrapper(props: DataNode) {
	return (
		<div className={styles.tree_title_wrap} onClick={e=>e.preventDefault()}>
			<span className={styles.tree_title}>{props.title}</span>
			<Space className={styles.action}>
				<ModalTrigger trigger={<PlusOutlined />} title='新增子集分类'>
					<p>ModalForm</p>
				</ModalTrigger>
				<ModalTrigger trigger={<EditOutlined />} title='编辑分类'>
					<p>ModalForm</p>
				</ModalTrigger>
				<Popconfirm title='确定删除?'>
					<DeleteOutlined />
				</Popconfirm>
			</Space>
		</div>
	)
}
export default memo(TreeTitleWrapper)
