import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Avatar, DatePicker, Form, Spin, Tabs, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import UserDetail from "../../Monitor/components/Sleep/UserDetail"
import WarnSetting from "../components/WarnSetting"
import NurseDetail from "../NurseDetail"
import useFetchData from "@/hooks/useFetchData"
import { useRouteMatch } from "react-router-dom"
import { FieldAvatar } from "@/components/Pro/ProField"

// 住户详情
function ResidentDetail() {
	const { params } = useRouteMatch<{ id: string }>()
	const { data, loading } = useFetchData({
		url: "/orgmgt/member/queryById",
		params: {
			id: params.id,
		},
		cache: true,
		auto: true,
		transform: (data) => data.result,
	})
	return (
		<div className='h-full flex flex-col'>
			<Spin spinning={loading}>
				<div
					className={
						"p-8 bg-white flex items-center justify-between flex-col md:flex-row"
					}
				>
					<FieldAvatar text={data?.avatar} size={80} icon={<UserOutlined />} />
					<div className={styles.user_info}>
						<div className='font-bold flex-shrink-0 w-20'>{data?.name}</div>
						<div className='flex justify-between flex-shrink-0'>
							<span>{data?.gender}</span>
							<span className='ml-4'>{data?.age}岁</span>
						</div>
					</div>
					<div
						className={classNames("flex-auto flex flex-col", styles.bed_info)}
					>
						<span>
							入住房间：{data?.floor}-{data?.roomName}房-{data?.bedName}床
						</span>
						<span>护管人员: {data?.careWorkerName}</span>
					</div>
				</div>
			</Spin>

			<div className='mt-6 px-4 bg-white flex-auto'>
				<Tabs>
					<Tabs.TabPane tab='基本信息' key='1' className='mt-12'>
						{/* 基本信息 */}
						<UserDetail data={data} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='护理设置' key='2'>
						<NurseDetail />
					</Tabs.TabPane>
					<Tabs.TabPane tab='预警设置' key='3'>
						<WarnSetting />
					</Tabs.TabPane>
					<Tabs.TabPane tab='睡眠设置' key='4'>
						<div className='mx-auto pt-10' style={{ width: 500 }}>
							<div className={styles.sleep_time}>日常睡眠时间段</div>
							<Form.Item name='sleepTime' label='入睡时间(当日)' required>
								<DatePicker picker='time' className='w-3/4' />
							</Form.Item>
							<Form.Item name='wakeTime' label='起床时间(次日)' required>
								<DatePicker picker='time' className='w-3/4' />
							</Form.Item>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	)
}
export default memo(ResidentDetail)
