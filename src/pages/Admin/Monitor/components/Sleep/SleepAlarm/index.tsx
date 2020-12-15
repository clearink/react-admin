import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { alarmColumns } from "../../../AlarmRecord"
import { Table } from "antd"

const columns = alarmColumns.filter((item) => item.dataIndex !== "user")
const data = Array.from({ length: 40 }, (_, i) => {
	return {
		key:i,
		avatar: i,
		user: "李小明",
		type: "离床超时,心率异常,呼吸率异常,体动频繁,围栏越界,血氧含量低",
		time: "2020/12/02 23:24",
		duration: "00:12:35",
		nurse: "万小川",
		status: "已处理",
	}
})
function SleepAlarm() {
	return (
		<div>
			<Table
				bordered
				rowSelection={{
					selectedRowKeys: [],
					onChange: () => {},
				}}
				columns={columns}
				dataSource={data}
				scroll={{ x: 1200 }}
			/>
		</div>
	)
}
export default memo(SleepAlarm)
