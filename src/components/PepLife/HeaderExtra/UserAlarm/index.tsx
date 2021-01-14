import React, { memo } from "react"
import { Badge, Dropdown } from "antd"
import styles from "./style.module.scss"
import useAlarmService, { AlarmService } from "./useAlarmService"
import { MessageOutlined, RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import UserAlarmDetail from "./UserAlarmDetail/UserAlarm.Detail"

// 用户告警信息
function UserAlarm() {
	const alarmService = useAlarmService()

	const AlarmList = (
		<div className={styles.alarm_list_wrap}>
			<div className={styles.title}>异常告警</div>
			{alarmService.data?.records.map((item: any) => {
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
								onClick={() => alarmService.open(item.id)}
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
					<span className='text-red-400 font-bold'>
						{alarmService.data?.total ?? 0}
					</span>
					)
				</span>
				<Link to='/monitor/alarm'>
					查看更多告警
					<RightOutlined />
				</Link>
			</div>
		</div>
	)
	return (
		<AlarmService.Provider value={alarmService}>
			<Dropdown
				placement='bottomRight'
				trigger={["click"]}
				overlay={AlarmList}
				getPopupContainer={(trigger) => trigger.parentElement!}
			>
				<Badge
					count={alarmService.data?.total ?? 0}
					className='mr-6 cursor-pointer'
				>
					<MessageOutlined style={{ fontSize: "24px" }} />
				</Badge>
			</Dropdown>
			<UserAlarmDetail ref={alarmService.alarmDetailRef} />
		</AlarmService.Provider>
	)
}
export default memo(UserAlarm)
