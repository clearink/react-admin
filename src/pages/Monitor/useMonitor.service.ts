import { useState } from "react"
import useMemoFetch from "@/hooks/useMemoFetch"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { convertRoomTree } from "../BedAllot/utils"
import { useBoolean } from "@/components/Pro/hooks/boolean"
import useTypedSelector from "@/hooks/useTypedSelector"

export const MonitorServiceContext = GetServiceContext(useMonitorService)

export interface BedItem {
	id: string
	memberName: string
	sleepScore: number
	deviceStatus: string
	num: string
	alarmStatus: boolean
	deviceNum: string
	memberId?: string
}

export default function useMonitorService() {
	const checkedList = useTypedSelector((state) => state.monitor)
	const [{ data: treeList }] = useMemoFetch({
		url: "/orgmgt/room/tree",
		method: "post",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			return convertRoomTree(response.result, "childList") ?? []
		},
	})
	const [roomId, setRoomId] = useState<string | null>(null) // 房间id

	// 获取根据选择的床位获取数据
	const [{ data: bedList, loading: fetchBedLoading }, fetchBed] = useMemoFetch({
		url: "/orgmgt/health/bed/monitor",
		method: "post",
		params: { ids: checkedList.map((item: any) => item.value) },
		transform: (data) => {
			return data.result
		},
	})

	const [bedItem, setBedItem] = useState<BedItem | null>(null) // 选择的床位
	const [visible, { toggle }] = useBoolean() // 控制 chart list

	return {
		treeList,
		roomId,
		setRoomId,
		bedList,
		fetchBedLoading,
		fetchBed,
		bedItem,
		setBedItem,
		visible,
		toggle,
	}
}
