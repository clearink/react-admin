import React, { memo, useRef, useState } from "react"
import { Badge, Dropdown } from "antd"
import styles from "./style.module.scss"
import { MessageOutlined, RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import UserAlarmDetail from "./UserAlarmDetail/UserAlarm.Detail"
import useMemoFetch from "@/hooks/useMemoFetch"
import { EditFormRef } from "@/components/BigSight/Form/EditForm"
import AlarmApi from "@/http/api/pages/AlarmApi"

// 用户告警信息
function UserAlarm() {
	const [id, setId] = useState<string | undefined>(undefined)
	const detailRef = useRef<EditFormRef>(null) // editFormRef
	const [{ data }, _, updateMemo] = useMemoFetch({
		cache: true,
		method: "get",
		url: "/orgmgt/alarm/info",
		params: { pageNo: 1, pageSize: 5 },
		transform: (response, cache) => {
			if (cache) return response
			return response.result
		},
	})

	const AlarmList = (
		<div className={styles.alarm_list_wrap}>
			<div className={styles.title}>异常告警</div>
			{data?.records.map((item: any) => {
				return (
					<div className={styles.alarm_list_item} key={item.id}>
						<div className={styles.item_name}>
							<span className={styles.name}>{item?.member?.name}</span>
							<span className={styles.floor}>{item?.member?.floor}</span>
						</div>
						<div className={styles.item_action}>
							<span className={styles.type}>{item?.description}</span>
							<span
								className={styles.link}
								onClick={() => {
									setId(item.id)
									detailRef.current?.toggle()
								}}
							>
								处理告警
							</span>
						</div>
					</div>
				)
			})}
			<div className={styles.footer}>
				<span className={styles.un_resolve}>
					未处理告警(
					<span className='text-red-400 font-bold'>{data?.total ?? 0}</span>)
				</span>
				<Link to='/monitor/alarm'>
					查看更多告警
					<RightOutlined />
				</Link>
			</div>
		</div>
	)
	return (
		<>
			<Dropdown
				placement='bottomRight'
				trigger={["click"]}
				overlay={AlarmList}
				getPopupContainer={(trigger) => trigger.parentElement!}
			>
				<Badge count={data?.total ?? 0} className='mr-6 cursor-pointer'>
					<MessageOutlined style={{ fontSize: "24px" }} />
				</Badge>
			</Dropdown>
			<UserAlarmDetail
				id={id}
				ref={detailRef}
				onFinish={async (values) => {
					await AlarmApi.CheckAlarm(values)
					updateMemo()
					return true
				}}
			/>
		</>
	)
}
export default memo(UserAlarm)
