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
import { ProFormSelect, ProFormTreeSelect } from "@/components/BigSight"
import styles from "./style.module.scss"
import { convertRoomTree } from "@/pages/BedAllot/utils"
import { DeviceItem } from ".."
// 床位关联 form
export interface BedConnectFormProps extends AddFormProps {
	deviceItem: DeviceItem | null
}
function BedConnectForm(props: BedConnectFormProps, ref: Ref<AddFormRef>) {
	const { deviceItem, ...rest } = props
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
			layout='horizontal'
			title='床位关联'
			{...rest}
			name='bed-connect'
			ref={formRef}
		>
			<div className={styles.deviceNum}>
				<span className={styles.label}>设备编号 :</span>
				<span className={styles.num}>{deviceItem?.num}</span>
			</div>
			<ProFormTreeSelect
				required
				onChange={setRoomId}
				label='选择房间'
				request={{
					url: "/orgmgt/room/tree",
					method: "post",
					transform: (response, cache) => {
						if (cache) return response
						return convertRoomTree(response.result, "childList") ?? []
					},
				}}
			/>

			<ProFormSelect
				required
				label='选择床位'
				name='orgBedId'
				request={{
					cache: false,
					url: roomId ? "/orgmgt/bed/unbound/queryByRoomId" : undefined,
					params: { id: roomId },
					transform: (response, cache) => {
						if (cache) return response
						return response.result?.map((item: any) => ({
							label: item.num,
							value: item.id,
						}))
					},
				}}
			/>
		</AddForm>
	)
}

export default memo(forwardRef(BedConnectForm))
