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
	ProFormRadio,
	ProFormSelect,
	ProFormTreeSelect,
} from "@/components/BigSight"
import { convertFloorTreeNode } from "@/pages/AlarmRecord/utils"
import ResidentApi from "@/http/api/pages/ResidentApi"

// 住户详情
function ResidentDetail() {
	const { params } = useRouteMatch<{ id: string }>()
	const formRef = useRef<ModalFormRef>(null)
	const [{ data, loading }] = useMemoFetch({
		url: "/orgmgt/member/queryById",
		params: {
			id: params.id,
		},
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
	useEffect(() => {
		formRef.current?.form.setFieldsValue({ bed: undefined })
	}, [roomId])
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
							入住房间:
							<ModalForm
								ref={formRef}
								onFinish={async (values) => {
									await ResidentApi.AllotBed({ ...values, memberId: params.id })
									return true
								}}
								onFieldsChange={() => {
									const newRoomId = formRef.current?.form.getFieldValue(
										"orgRoomId"
									)
									console.log("newRoomId", newRoomId)
									setRoomId(newRoomId)
								}}
								title='床位设置'
								trigger={
									<span className={styles.user_room}>
										{data?.floor}-{data?.roomName}房-{data?.bedName}床
										<EditOutlined className={styles.icon} />
									</span>
								}
							>
								<ProFormTreeSelect
									label='房间'
									required
									name='orgRoomId'
									placeholder='请选择房间'
									request={{
										url: "/orgmgt/room/treeList",
										method: "post",
										transform: (response, cache) => {
											if (cache) return response
											if (response)
												return convertFloorTreeNode(response.result, [
													"orgBuildings",
													"orgRooms",
												])
											return []
										},
									}}
								/>
								<ProFormSelect
									required
									label='床位'
									name='orgBedId'
									placeholder='请选择床位'
									request={{
										url: roomId ? "/orgmgt/bed/queryByRoomId" : undefined,
										params: { id: roomId },
										cache: true,
										transform: (response, cache) => {
											if (cache) return response

											return response.result.map((item: any) => ({
												label: item.num,
												value: item.id,
											}))
										},
									}}
								/>
							</ModalForm>
						</span>
						<span>
							护管人员:
							<ModalForm
								layout='horizontal'
								title='护管设置'
								trigger={
									<span className={styles.user_nurse}>
										{data?.careWorkerName}
										<EditOutlined className={styles.icon} />
									</span>
								}
							>
								<ProFormGroup>
									<ProFormInput placeholder='姓名' label='人员查找' />
									<ProFormSelect
										placeholder='职务类型'
										request={{
											url: "/sys/dict/getDictItems/careworkerPosition",
											cache: true,
											transform: (response, cache) => {
												if (cache) return response
												return response.result.map((item: any) => ({
													label: item.text,
													value: item.value,
												}))
											},
										}}
									/>
									<Button type='primary'>查找</Button>
								</ProFormGroup>
								<Form.Item label='人员选择' name='nurse'>
									<Radio.Group>
										{nurseList?.map((item: any) => {
											return (
												<div key={item.id}>
													<FieldAvatar
														icon={<UserOutlined />}
														text={item.avatar}
													/>
													<div>{item.name}</div>
													<div>{item.position}</div>
													<Radio value={item.id} />
												</div>
											)
										})}
									</Radio.Group>
								</Form.Item>
								{/* <ProFormRadio
									label='人员选择'
									options={[1, 2, 3, 4, 5, 6]}
									render={(props) => {
										return (
											<>
												{(props.options as any[]).map((item) => {
													return (
														<div key={item.value}>
															<FieldAvatar icon={<UserOutlined />} />
															<span>21</span>
														</div>
													)
												})}
											</>
										)
									}}
								/> */}
							</ModalForm>
						</span>
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
