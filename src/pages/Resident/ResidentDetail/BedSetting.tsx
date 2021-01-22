import React, { useContext, useEffect, useRef, useState } from "react"
import { useRouteMatch } from "react-router-dom"
import { ProFormSelect, ProFormTreeSelect } from "@/components/BigSight"
import ModalForm, {
	ModalFormRef,
} from "@/components/Pro/ProForm/components/ModalForm"
import ResidentApi from "@/http/api/pages/ResidentApi"
import styles from "./style.module.scss"
import { ResidentDetailService } from "./useResidentDetail.service"
import { EditOutlined } from "@ant-design/icons"
import { convertFloorTreeNode } from "@/pages/AlarmRecord/utils"

// 床位设置
function BedSetting() {
	const service = useContext(ResidentDetailService)
	const { params } = useRouteMatch<{ id: string }>()
	const formRef = useRef<ModalFormRef>(null)
	const [roomId, setRoomId] = useState()
	useEffect(() => {
		formRef.current?.form.setFieldsValue({ orgBedId: undefined })
	}, [roomId])
	return (
		<ModalForm
			ref={formRef}
			onFinish={async (values) => {
				await ResidentApi.AllotBed({ ...values, memberId: params.id })
				service.updateMemo()
				return true
			}}
			title='床位设置'
			trigger={
				<span className={styles.user_room}>
					{service.residentDetail?.floor}-{service.residentDetail?.roomName}房-
					{service.residentDetail?.bedName}床
					<EditOutlined className={styles.icon} />
				</span>
			}
		>
			<ProFormTreeSelect
				label='房间'
				required
				name='orgRoomId'
				placeholder='请选择房间'
				onChange={setRoomId}
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
	)
}
export default BedSetting
