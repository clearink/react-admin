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
import { DeviceItem } from ".."

// 床位关联 form
export interface BedConnectFormProps extends AddFormProps {
	/** 设备编号 */
	deviceItem: DeviceItem | null
}

function BedConnectForm(props: BedConnectFormProps, ref: Ref<AddFormRef>) {
	const { deviceItem, ...rest } = props
	const formRef = useRef<AddFormRef>(null)
	const countDownRef = useRef<CountDownRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])

	const [roomId, setRoomId] = useState()
	const [memberId, setMemberId] = useState<null | string>(null)
	const [userList, setUserList] = useState<any[]>([])

	// 轮询
	const Poll = useMemo(() => new Polling(), [])

	useEffect(() => {
		if (!roomId) return
		formRef.current?.form.setFieldsValue({ orgBedId: undefined })
	}, [roomId])
	// 获取关联用户列表
	const GetUserList = useMemoCallback(() => {
		DeviceApi.GetUserList({ id: deviceItem!.id }).then(({ data }) => {
			setUserList(data.result)
		})
	}, [])

	// 重置
	const handleReset = useCallback(() => {
		Poll.abort() // 结束轮询
		countDownRef.current?.reset() // 结束计时
	}, [Poll])

	useEffect(() => {
		if (!deviceItem?.id) return
		GetUserList()
		formRef.current?.form.setFieldsValue({
			connect_user: undefined,
		})
		handleReset()
		setMemberId(null)
	}, [deviceItem, handleReset, Poll, GetUserList])

	const handleConnectUser = async () => {
		const form = formRef.current!.form
		const memberId = form.getFieldValue("memberId") // 住户ID
		if (!memberId) {
			form.setFields([
				{
					name: "memberId",
					errors: ["请选择用户"],
				},
			])
		} else if (deviceItem?.id) {
			await DeviceApi.ConnectUser({ deviceId: deviceItem.id, memberId })
			GetUserList()
		}
	}

	// 开始等待录入指纹
	const handleStart = async () => {
		Poll.reset() // 重置计时
		const memberId = formRef.current?.form.getFieldValue("connect_user")
		await DeviceApi.InputFinger({
			memberId,
			deviceId: deviceItem!.id,
		})
		countDownRef.current?.start()
		// 轮询
		Poll.poll(async () => {
			try {
				const { data } = await DeviceApi.GetFingerInfo({ memberId })
				if (data?.result) {
					countDownRef.current?.reset()
					handleReset()
					await DeviceApi.UpdateFingerInfo({
						memberId,
						deviceId: deviceItem!.id,
					})
					message.success({
						content: "指纹录入成功",
						key: "finger-input-success",
					})
					GetUserList()
				}
			} catch (error) {
				if (Poll.retry === 0) {
					message.error({
						content: "指纹录入失败, 请重试!",
						key: "input-finger-error",
					})
				}
			}
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
		await DeviceApi.UnConnectUser({
			memberId: memberId!,
			deviceId: deviceItem!.id,
		})
		handleReset()
		setMemberId(null)
		GetUserList()
	}
	return (
		<>
			<AddForm
				type='modal'
				title='人员关联'
				layout='horizontal'
				{...rest}
				name='user-connect'
				ref={formRef}
			>
				<div className={styles.deviceNum}>
					<span className={styles.label}>设备编号:</span>
					<span className={styles.num}>{deviceItem?.num}</span>
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
										setMemberId(item.id)
										formRef.current?.form.setFieldsValue({
											connect_user: item.id,
										})
									}}
								>
									<Radio value={item.id}></Radio>
									<div className={styles.name}>{item.name}</div>
									{item.fingerprint && (
										<IconFont type='icon-zhiwen' className={styles.icon} />
									)}
								</div>
							))
						) : (
							<Empty />
						)}
					</Radio.Group>
				</Form.Item>
				<Space className={styles.action_btn}>
					{/* 没有选择已关联用户时无法点击 */}
					{deviceItem?.deviceType !== "WATCH" && (
						<CountDown ref={countDownRef} onTarget={handleTarget} num={60}>
							{({ active, count }) => (
								<Button
									disabled={!memberId || active}
									type='primary'
									onClick={handleStart}
								>
									{active ? `等待录入指纹(${count}s)` : "录入用户指纹"}
								</Button>
							)}
						</CountDown>
					)}
					<Button disabled={!memberId} danger onClick={handleUnConnectUser}>
						解除用户关联
					</Button>
				</Space>
			</AddForm>
		</>
	)
}

export default memo(forwardRef(BedConnectForm))
