import React, {
	forwardRef,
	memo,
	Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import {
	ProFormGroup,
	ProFormSelect,
	ProFormTreeSelect,
} from "@/components/BigSight"
import styles from "./style.module.scss"
import { convertRoomTree } from "@/pages/BedAllot/utils"
import { Button, Empty, Form, message, Radio, Space } from "antd"
import DeviceApi from "@/http/api/pages/DeviceApi"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import IconFont from "@/components/IconFont"
import CountDown, {
	CountDownRef,
} from "@/components/Pro/ProForm/components/ProFormCaptcha/CountDown"
import Polling from "@/http/polling"

// 床位关联 form
export interface BedConnectFormProps extends AddFormProps {
	/** 设备编号 */
	deviceNum: string | null
	deviceId: string
}
interface StartFingerData {
	start: () => void
	reset: () => void
}
function BedConnectForm(props: BedConnectFormProps, ref: Ref<AddFormRef>) {
	const { deviceNum, deviceId, ...rest } = props
	const formRef = useRef<AddFormRef>(null)
	const countDownRef = useRef<CountDownRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])

	const [roomId, setRoomId] = useState()
	const [canClick, setCanClick] = useState(false)
	const [userList, setUserList] = useState<any[]>([])

	// 轮询
	const Poll = useMemo(() => new Polling(), [])

	useEffect(() => {
		if (!roomId) return
		formRef.current?.form.setFieldsValue({ orgBedId: undefined })
	}, [roomId])
	// 获取关联用户列表
	const GetUserList = useMemoCallback(() => {
		DeviceApi.GetUserList({ id: deviceId }).then(({ data }) => {
			setUserList(data.result)
		})
	}, [])

	// 重置
	const handleReset = useCallback(() => {
		Poll.abort() // 结束计时
		setCanClick(false) // 不可点击
		countDownRef.current?.reset()
	}, [Poll])

	useEffect(() => {
		if (!deviceId) return
		GetUserList()
		formRef.current?.form.setFieldsValue({
			connect_user: undefined,
		})
		handleReset()
	}, [deviceId, handleReset, Poll, GetUserList])

	const handleConnectUser = async () => {
		const form = formRef.current!.form
		const memberId = form.getFieldValue("memberId")
		if (!memberId) {
			form.setFields([
				{
					name: "memberId",
					errors: ["请选择用户"],
				},
			])
		} else if (deviceId) {
			await DeviceApi.ConnectUser({ deviceId, memberId })
			GetUserList()
		}
	}

	// 开始等待录入指纹
	const handleStart = async () => {
		Poll.reset() // 重置计时
		const memberId = formRef.current?.form.getFieldValue("connect_user")
		await DeviceApi.InputFinger({
			memberId,
			deviceId,
		})
		countDownRef.current?.start()
		Poll.poll(() => {
			DeviceApi.GetFingerInfo({ memberId }).then(({ data }) => {
				if (data?.result) {
					countDownRef.current?.reset()
					handleReset()
					GetUserList()
					message.success(data?.message ?? "指纹录入成功")
				}
			})
		}, 1000)
	}
	// 计时结束
	const handleTarget = () => {
		handleReset()
		message.error({
			content: "指纹录入失败, 请重试!",
			key: "input-finger-error",
		})
	}
	// 解除关联
	const handleUnConnectUser = async () => {
		const memberId = formRef.current?.form.getFieldValue("connect_user")
		await DeviceApi.UnConnectUser({ memberId, deviceId })
		handleReset()
		GetUserList()
	}
	return (
		<>
			<AddForm
				type='modal'
				title='床位关联'
				layout='horizontal'
				{...rest}
				name='user-connect'
				ref={formRef}
			>
				<div className={styles.deviceNum}>
					<span className={styles.label}>设备编号:</span>
					<span className={styles.num}>{deviceNum}</span>
				</div>
				<ProFormTreeSelect
					required
					onChange={setRoomId}
					label='房间'
					name='orgRoomId'
					request={{
						url: "/orgmgt/room/tree",
						method: "post",
						transform: (response, cache) => {
							if (cache) return response
							return convertRoomTree(response.result, "childList") ?? []
						},
					}}
				/>

				<ProFormGroup>
					<ProFormSelect
						required
						label='住户'
						width='m'
						name='memberId'
						request={{
							cache: false,
							url: roomId ? "/orgmgt/room/member/queryByRoomId" : undefined,
							params: { id: roomId },
							transform: (response, cache) => {
								if (cache) return response
								return response.result?.map((item: any) => ({
									label: item.name,
									value: item.id,
								}))
							},
						}}
					/>
					<Button type='primary' onClick={handleConnectUser}>
						添加关联用户
					</Button>
				</ProFormGroup>
				<h3 className={styles.connect_user_header}>已关联用户</h3>
				<Form.Item name='connect_user'>
					<Radio.Group className={styles.user_list}>
						{userList.length > 0 ? (
							userList.map((item) => (
								<div
									key={item.id}
									className={styles.item}
									onClick={() => {
										setCanClick(true)
										formRef.current?.form.setFieldsValue({
											connect_user: item.id,
										})
									}}
								>
									<Radio value={item.id}></Radio>
									<div className={styles.name}>{item.name}</div>
									<IconFont type='icon-zhiwen' className={styles.icon} />
								</div>
							))
						) : (
							<Empty />
						)}
					</Radio.Group>
				</Form.Item>
				<Space className={styles.action_btn}>
					<CountDown ref={countDownRef} onTarget={() => handleTarget} num={120}>
						{({ active, count, start, reset }) => (
							<Button
								disabled={!canClick || active}
								type='primary'
								onClick={handleStart}
							>
								{active ? `等待录入指纹(${count}s)` : "录入用户指纹"}
							</Button>
						)}
					</CountDown>
					<Button disabled={!canClick} danger onClick={handleUnConnectUser}>
						解除用户关联
					</Button>
				</Space>
			</AddForm>
		</>
	)
}

export default memo(forwardRef(BedConnectForm))
