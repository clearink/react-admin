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
import { convertTreeNode } from "@/pages/BedAllot/utils"

// 床位设置
function BedSetting() {
	const service = useContext(ResidentDetailService)
	const { params } = useRouteMatch<{ id: string }>()
	const formRef = useRef<ModalFormRef>(null)

	// 楼层ID
	const [buildingId, setBuildingId] = useState<string | null>(null)
	// 房间ID
	const [orgRoomId, setOrgRoomId] = useState<string | null>(null)

	useEffect(() => {
		// 楼层更改 修改房间值
		formRef.current?.form.setFieldsValue({ orgRoomId: undefined })
	}, [buildingId])

	useEffect(() => {
		// 房间更改 修改床位值
		formRef.current?.form.setFieldsValue({ orgBedId: undefined })
	}, [orgRoomId])

	return (
		<ModalForm
			ref={formRef}
			onFinish={async (values) => {
				await ResidentApi.AllotBed({
					orgBedId: values.orgBedId,
					memberId: params.id,
				})
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
				label='选择楼层'
				name='buildingId'
				required
				onChange={setBuildingId}
				request={{
					url: "/orgmgt/building/treeList",
					method: "post",
					transform: (response, cache) => {
						if (cache) return response
						return convertTreeNode(response?.result, "orgBuildings") ?? []
					},
				}}
			/>
			<ProFormTreeSelect
				label='选择房间'
				name='orgRoomId'
				required
				onChange={setOrgRoomId}
				request={{
					url: buildingId ? "/orgmgt/room/list/queryByBuildingId" : undefined,
					params: { id: buildingId },
					transform: (response, cache) => {
						if (cache) return response
						return response.result?.map((item: any) => ({
							label: item.num,
							value: item.id,
						}))
					},
				}}
			/>
			<ProFormTreeSelect
				label='选择床位'
				name='orgBedId'
				required
				request={{
					url: orgRoomId ? "/orgmgt/bed/emptyBedList/queryByRoomId" : undefined,
					params: { id: orgRoomId },
					transform: (response, cache) => {
						if (cache) return response
						return response.result?.map((item: any) => ({
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
