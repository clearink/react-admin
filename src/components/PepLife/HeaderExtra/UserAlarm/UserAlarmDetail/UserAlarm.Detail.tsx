import {
	FieldAvatar,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/BigSight"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import { UserOutlined, WarningOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React, { forwardRef, memo, Ref } from "react"
import styles from "./style.module.scss"
import useAlarmDetailService, { AlarmDetailService } from "./useAlarmDetail"

// 告警详情
export interface AlarmDetailProps {
	id?: string
}
function AlarmDetail(props: AlarmDetailProps, ref: Ref<() => void>) {
	const alarmDetailService = useAlarmDetailService(props.id, ref)

	return (
		<AlarmDetailService.Provider value={alarmDetailService}>
			<ModalForm
				title='告警处理'
				ref={alarmDetailService.modalRef}
				className={styles.form}
				layout='horizontal'
				onFinish={alarmDetailService.handleSubmit}
			>
				<Spin spinning={alarmDetailService.loading}>
					<div className={styles.detail_wrap}>
						<FieldAvatar
							text={alarmDetailService.data?.member?.avatar}
							size={70}
							icon={<UserOutlined />}
							className={styles.avatar}
						/>
						<div className={styles.user}>
							<span className='font-bold text-4xl mb-4'>
								{alarmDetailService.data?.member?.name}
							</span>
							<span className='flex justify-between text-2xl text-gray-400'>
								<span>{alarmDetailService.data?.member?.gender}</span>
								<span>{alarmDetailService.data?.member?.age}岁</span>
							</span>
						</div>

						<div className={styles.nurse}>
							<div>
								<span className='mr-4 mb-4 inline-block'>入住床位:</span>
								<span>
									{alarmDetailService.data?.member?.floor}-
									{alarmDetailService.data?.member?.bedName}
								</span>
							</div>
							<div>
								<span className='mr-4 mb-4 inline-block'>护管人员:</span>
								<span>{alarmDetailService.data?.member?.careWorkerName}</span>
							</div>
							<div>
								<span className='mr-4 mb-4 inline-block'>家属联系:</span>
								<span>XXX</span>
							</div>
						</div>
					</div>
					{/* 详情 */}
					<div className={styles.alarm_reason}>
						<span className={styles.label}>
							<WarningOutlined className='mx-2' />
							<span className='mr-4'>告警信息:</span>
						</span>
						<span className='text-red-500'>{alarmDetailService.data?.alarmType}</span>
					</div>

					<ProFormRadio
						label='处理方式'
						name='processMethod'
						className={styles.radio_group}
						request={{
							url: "/sys/dict/getDictItems/processMethod",
							method: "get",
							cache: true,
							transform: (response, cache) => {
								if (cache) return response
								return response.result?.map((item: any) => ({
									label: item.text,
									value: item.text,
								}))
							},
						}}
					/>
					<ProFormTextArea
						name='processRemark'
						label='处理备注'
						placeholder='请输入处理备注信息'
						showCount
						rows={4}
						maxLength={100}
					/>
				</Spin>
			</ModalForm>
		</AlarmDetailService.Provider>
	)
}
export default forwardRef(AlarmDetail)
