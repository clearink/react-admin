import React from "react"
import { Button, Tag } from "antd"
import styles from "./style.module.scss"
import useTypedSelector from "@/hooks/useTypedSelector"
export interface SelectedBedListProps {
	list: Array<{ label: string; value: string }> // 床位列表
	checkedList: Array<{ label: string; value: string }> // 列表
	onChange?: (checked: boolean, item: { label: string; value: string }) => void
}
export default function SelectedBedList(props: SelectedBedListProps) {
	const { list, onChange, checkedList } = props
	return (
		<div className={styles.wrap}>
			<label className={styles.label}>床位</label>
			<div className={styles.list_wrap}>
				{list.map((item) => {
					const checked = checkedList.find(({ value }) => value === item.value)
					// 和本地列表相比较
					return (
						<Tag.CheckableTag
							key={item.value}
							checked={!!checked}
							className={styles.list_item}
							onChange={(checked) => onChange?.(checked, item)}
						>
							{item.label}
						</Tag.CheckableTag>
					)
				})}
			</div>
		</div>
	)
}
