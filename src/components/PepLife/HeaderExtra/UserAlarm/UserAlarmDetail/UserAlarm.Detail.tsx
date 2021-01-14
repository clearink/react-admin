import {
	EditForm,
	FieldAvatar,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/BigSight"
import { EditFormProps, EditFormRef } from "@/components/BigSight/Form/EditForm"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMemoFetch from "@/hooks/useMemoFetch"
import AlarmApi from "@/http/api/pages/AlarmApi"
import { UserOutlined, WarningOutlined } from "@ant-design/icons"
import React, {
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import styles from "./style.module.scss"

// 告警详情
function AlarmDetail(props: EditFormProps, ref: Ref<EditFormRef>) {
	const { id, ...rest } = props
	const formRef = useRef<EditFormRef>(null)
	const [data, setData] = useState<any>(null)
	useImperativeHandle(ref, () => formRef.current!, [])

	const fetchData = useMemoCallback(async () => {
		const { data } = await AlarmApi.FetchDetail({ id })
		formRef.current?.form.setFieldsValue(data.result)
		setData(data.result)
	}, [])

	useEffect(() => {
		if (!id) return
		fetchData()
	}, [id, fetchData])

	return (
		<EditForm
			ref={formRef}
			type='modal'
			title='告警处理'
			className={styles.form}
			layout='horizontal'
			{...rest}
		>
			<div className={styles.detail_wrap}>
				<FieldAvatar
					text={data?.member?.avatar}
					size={70}
					icon={<UserOutlined />}
					className={styles.avatar}
				/>
				<div className={styles.user}>
					<span className='font-bold text-4xl mb-4'>{data?.member?.name}</span>
					<span className='flex justify-between text-2xl text-gray-400'>
						<span>{data?.member?.gender}</span>
						<span>{data?.member?.age}岁</span>
					</span>
				</div>

				<div className={styles.nurse}>
					<div>
						<span className='mr-4 mb-4 inline-block'>入住床位:</span>
						<span>
							{data?.member?.floor}-{data?.member?.bedName}
						</span>
					</div>
					<div>
						<span className='mr-4 mb-4 inline-block'>护管人员:</span>
						<span>{data?.member?.careWorkerName}</span>
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
				<span className='text-red-500'>{data?.alarmType}</span>
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
		</EditForm>
	)
}
export default forwardRef(AlarmDetail)
