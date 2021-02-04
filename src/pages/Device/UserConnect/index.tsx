import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
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
import { Button } from "antd"
// 床位关联 form
export interface BedConnectFormProps extends AddFormProps {
	/** 设备编号 */
	deviceNum: string | null
}
function BedConnectForm(props: BedConnectFormProps, ref: Ref<AddFormRef>) {
	const { deviceNum, ...rest } = props
	const formRef = useRef<AddFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	const [roomId, setRoomId] = useState()
	useEffect(() => {
		if (roomId) {
			formRef.current?.form.setFieldsValue({ orgBedId: undefined })
		}
	}, [roomId])
	return (
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
        label='选择房间'
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
          label='选择住户'
          width='m'
					name='orgBedId'
					request={{
						cache: false,
						url: roomId ? "/orgmgt/room/member/queryByRoomId" : undefined,
						params: { id: roomId },
						transform: (response, cache) => {
							if (cache) return response
							return response.result?.map((item: any) => ({
								label: item.text,
								value: item.value,
							}))
						},
					}}
				/>
				<Button type='primary'>添加关联用户</Button>
			</ProFormGroup>

		</AddForm>
	)
}

export default memo(forwardRef(BedConnectForm))
