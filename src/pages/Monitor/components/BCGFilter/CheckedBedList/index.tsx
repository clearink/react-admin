import React, { useContext } from "react"
import { Button } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/monitor"
import { MonitorServiceContext } from "@/pages/Monitor/useMonitor.service"
import styles from "./style.module.scss"
import useAppDispatch from "@/hooks/useAppDispatch"

export interface CheckedBedListProps {
	toggle: () => void
}
export default function CheckedBedList(props: CheckedBedListProps) {
	const { list } = useTypedSelector((state) => state.monitor)
	const { fetchBed } = useContext(MonitorServiceContext)
	const dispatch = useAppDispatch()
	const handleDelete = (value: string) => {
		dispatch(actions.filter(value))
	}
	return (
		<div className={styles.wrap}>
			<label className={styles.label} onClick={() => fetchBed()}>
				已选床位
			</label>
			<div className={styles.list_wrap}>
				{list.map((item) => (
					<Button className={styles.list_item} key={item.value}>
						<span>{item.label}</span>
						<DeleteOutlined
							className={styles.delete}
							onClick={() => handleDelete(item.value)}
						/>
					</Button>
				))}
				<Button
					type='dashed'
					className={styles.action}
					icon={<PlusOutlined />}
					onClick={props.toggle}
				>
					添加
				</Button>
			</div>
		</div>
	)
}
/**
 * 	<ProFormRadio
					name='status'
					label={
						<div className={styles.label} onClick={() => fetchBed()}>
							已选床位
						</div>
					}
					optionType='button'
					buttonStyle='solid'
					options={checkedList}
					formItemClassName={classNames(
						styles.filter_item,
						styles.checked_floor_list
					)}
				/>
 */
