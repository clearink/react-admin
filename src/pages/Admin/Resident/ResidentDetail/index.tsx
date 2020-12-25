import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Avatar, DatePicker, Form, Tabs, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import UserDetail from "../../Monitor/components/Sleep/UserDetail"
import WarnSetting from "../components/WarnSetting"
import NurseDetail from "../NurseDetail"

// 住户详情
function ResidentDetail() {
	return (
		<div className='h-full flex flex-col'>
			<div
				className={
					"p-8 bg-white flex items-center justify-between flex-col md:flex-row"
				}
			>
				<Avatar icon={<UserOutlined />} size={80} />
				<div className={styles.user_info}>
					<div className='font-bold flex-shrink-0'>张三丰</div>
					<div className='flex justify-between flex-shrink-0'>
						<span>男</span>
						<span>64岁</span>
					</div>
				</div>
				<div className={classNames("flex-auto flex flex-col", styles.bed_info)}>
					<span>入住房间：五楼-507房-022床</span>
					<span>
						护管人员: 王晓霞 (
						<Typography.Text copyable className='text-blue-400'>
							17712345678
						</Typography.Text>
						)
					</span>
				</div>
			</div>

			<div className='mt-6 px-4 bg-white flex-auto'>
				<Tabs>
					<Tabs.TabPane tab='基本信息' key='1' className='mt-12 mx-8'>
						{/* 基本信息 */}
						<UserDetail />
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
