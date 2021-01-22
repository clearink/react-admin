import React, { memo, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Button, DatePicker, Form, Radio, Spin, Tabs } from "antd"
import { EditFilled, EditOutlined, UserOutlined } from "@ant-design/icons"
import UserDetail from "../../Monitor/components/Sleep/UserDetail"
import WarnSetting from "../components/WarnSetting"
import NurseDetail from "../NurseDetail"
import useMemoFetch from "@/hooks/useMemoFetch"
import { useRouteMatch } from "react-router-dom"
import { FieldAvatar } from "@/components/Pro/ProField"
import ModalForm, {
	ModalFormRef,
} from "@/components/Pro/ProForm/components/ModalForm"
import {
	ProFormGroup,
	ProFormInput,
	ProFormSelect,
	ProFormTreeSelect,
} from "@/components/BigSight"
import { convertFloorTreeNode } from "@/pages/AlarmRecord/utils"
import ResidentApi from "@/http/api/pages/ResidentApi"
import useResidentDetailService, {
	ResidentDetailService,
} from "./useResidentDetail.service"
import DetailHeader from "./DetailHeader"

// 住户详情
function ResidentDetail() {
	const { params } = useRouteMatch<{ id: string }>()
	const formRef = useRef<ModalFormRef>(null)
	// 住户详情
	const [{ data, loading }] = useMemoFetch({
		// url: "/orgmgt/member/queryById",
		params: { id: params.id },
		cache: true,
		transform: (data) => data.result,
	})

	const [roomId, setRoomId] = useState<string | null>(null)
	const [current, setCurrent] = useState(1)
	// 请求 护管人员
	const [{ data: nurseList }] = useMemoFetch({
		url: "/orgmgt/careWorker/list",
		method: "post",
		params: {
			pageNo: current,
			pageSize: 10,
		},
		transform: (response) => {
			return response.result.records
		},
	})

	const residentDetailService = useResidentDetailService()
	return (
		<ResidentDetailService.Provider value={residentDetailService}>
			<div className='h-full flex flex-col'>
				<DetailHeader />
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
		</ResidentDetailService.Provider>
	)
}
export default memo(ResidentDetail)
