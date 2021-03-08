import useTypedSelector from "@/hooks/useTypedSelector"
import { MonitorServiceContext } from "@/pages/Monitor/useMonitor.service"
import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React, { useContext } from "react"
import styles from "./style.module.scss"

export interface CheckedBedListProps {
	toggle: () => void
}
export default function CheckedBedList(props: CheckedBedListProps) {
	const { list } = useTypedSelector((state) => state.monitor)
	const { fetchBed } = useContext(MonitorServiceContext)
	return (
		<div className={styles.wrap}>
			<label className={styles.label} onClick={() => fetchBed()}>
				已选床位
			</label>
			<div className={styles.list_wrap}>
				{list.map((item) => (
					<Button className={styles.list_item} key={item.value}>
						<span>{item.label}</span>
						<span>x</span>
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
