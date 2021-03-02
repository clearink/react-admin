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
import { convertRoomTree } from "@/pages/BedAllot/utils"
import useMemoFetch from "@/hooks/useMemoFetch"
import { convertServerListData } from "./utils"

// 床位设置
function BedSetting() {
	const service = useContext(ResidentDetailService)
	const { params } = useRouteMatch<{ id: string }>()
	const formRef = useRef<ModalFormRef>(null)

	// 楼层ID
	const [buildingId, setBuildingId] = useState<string | null>(null)
	// 房间ID
	const [orgRoomId, setOrgRoomId] = useState<string | null>(null)

	// 房间树
	const [
		{ data: roomTree, loading: roomLoading },
		fetchRoomData,
	] = useMemoFetch({
		auto: false,
		url: "/orgmgt/room/list/queryByBuildingId",
		params: { id: buildingId },
		transform: convertServerListData,
	})

	// 床位树
	const [{ data: bedTree, loading: bedLoading }, fetchBedData] = useMemoFetch({
		auto: false,
		url: "/orgmgt/bed/emptyBedList/queryByRoomId",
		params: { id: orgRoomId },
		transform: convertServerListData,
	})

	useEffect(() => {
		// 楼层更改 修改房间值
		formRef.current?.form.setFieldsValue({ orgRoomId: undefined })
		if (buildingId) fetchRoomData()
	}, [buildingId, fetchRoomData])

	useEffect(() => {
		// 房间更改 修改床位值
		formRef.current?.form.setFieldsValue({ orgBedId: undefined })
		if (orgRoomId) fetchBedData()
	}, [orgRoomId, fetchBedData])

	return (
		<ModalForm
			ref={formRef}
			onFinish={async (values) => {
				await ResidentApi.AllotBed({
					orgBedId: values.orgBedId,
					memberId: params.id,
				})
				setOrgRoomId(null)
				setBuildingId(null)
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
					url: "/orgmgt/building/tree",
					method: "post",
					transform: (response, cache) => {
						if (cache) return response
						return convertRoomTree(response?.result, "childList") ?? []
					},
				}}
			/>
			<ProFormSelect
				label='选择房间'
				name='orgRoomId'
				required
				onChange={(value: any) => setOrgRoomId(value)}
				loading={roomLoading}
				options={roomTree}
			/>

			<ProFormSelect
				label='选择床位'
				name='orgBedId'
				required
				loading={bedLoading}
				options={bedTree}
			/>
		</ModalForm>
	)
}
export default BedSetting
