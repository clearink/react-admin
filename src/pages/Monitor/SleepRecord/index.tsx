import React from "react"
import { Avatar, Space, Spin, Tabs, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import styles from "./style.module.scss"
import SleepDetail from "../components/Sleep/SleepDetail"
import SleepAlarm from "../components/Sleep/SleepAlarm"
import UserDetail from "../components/Sleep/UserDetail"
import BloodSugar from "../components/Sleep/BloodSugar"
import useMemoFetch from "@/hooks/useMemoFetch"
import { useParams } from "react-router-dom"
import { FieldAvatar } from "@/components/BigSight"
import GetFullUrl from "@/utils/data/GetFullUrl"
import BloodPressure from "../components/Sleep/BloodPressure"
import BloodOxy from "../components/Sleep/BloodOxy"
// 监控分析 睡眠报告

const recordList = [
	{
		title: "睡眠",
		icon: UserOutlined,
		component: SleepDetail,
	},
	{
		title: "运动",
		icon: UserOutlined,
	},
	{
		title: "血压",
		icon: UserOutlined,
		component: BloodPressure,
	},
	{
		title: "血糖",
		icon: UserOutlined,
		component: BloodSugar,
	},
	{
		title: "血氧",
		icon: UserOutlined,
		component: BloodOxy,
	},
	{
		title: "心率",
		icon: UserOutlined,
	},
	{
		title: "体重/体脂",
		icon: UserOutlined,
	},
	{
		title: "尿液",
		icon: UserOutlined,
	},
]
function SleepRecord() {
	const { id } = useParams<{ id: string }>()
	const [{ data: detail, loading }] = useMemoFetch({
		url: "/orgmgt/member/queryById",
		params: { id },
		cache: true,
		transform: (data) => data.result,
	})
	return (
		<div className='h-full flex flex-col'>
			<Spin spinning={loading}>
				<div className='p-8 bg-white flex items-center flex-wrap'>
					<div
						className={classNames(
							styles.user_info,
							"mb-8 w-full md:mb-0 md:w-auto"
						)}
					>
						<FieldAvatar
							text={GetFullUrl(detail?.avatar)}
							size={80}
							className='mr-10'
							icon={<UserOutlined />}
						/>
						<div>
							<Typography.Title className='text-center' level={4}>
								{detail?.name}
							</Typography.Title>
							<Space>
								<span className={styles.text}>{detail?.gender}</span>
								<span className={styles.text}>{detail?.age}岁</span>
							</Space>
						</div>
					</div>

					<div className={styles.bed_info}>
						<p>
							入住房间:{detail?.floor}/{detail?.roomName}房/{detail?.bedName}床
						</p>
						<div className='flex justify-between flex-wrap md:flex-no-wrap'>
							<div className='text-blue-400 mb-4 md:mb-0'>
								护管人员:
								<Typography.Text copyable className='text-blue-400'>
									{detail?.careWorkerName}
								</Typography.Text>
							</div>
							<div>
								紧急联系人:
								<Typography.Text copyable className='text-blue-400'>
									{detail?.memberProfile?.contactMobile1}
								</Typography.Text>
							</div>
						</div>
					</div>
				</div>
			</Spin>
			<div className='px-8 bg-white flex-auto mt-8'>
				<Tabs size='large'>
					<Tabs.TabPane key='1' tab='健康记录'>
						<Tabs type='card' className={styles.card_tabs}>
							{recordList.map((item) => (
								<Tabs.TabPane
									key={item.title}
									tab={
										<div className={styles.custom_tab_btn}>
											<item.icon className={styles.icon} />
											<span>{item.title}</span>
										</div>
									}
								>
									{item.component && <item.component />}
								</Tabs.TabPane>
							))}
						</Tabs>
					</Tabs.TabPane>
					<Tabs.TabPane key='2' tab='告警记录'>
						<SleepAlarm />
					</Tabs.TabPane>
					<Tabs.TabPane key='3' tab='护理记录'></Tabs.TabPane>
					<Tabs.TabPane key='4' tab='活动轨迹'></Tabs.TabPane>
					<Tabs.TabPane key='5' tab='基本信息'>
						<UserDetail />
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default SleepRecord
