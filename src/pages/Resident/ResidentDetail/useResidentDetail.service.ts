import useMemoFetch from "@/hooks/useMemoFetch"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { useRouteMatch } from "react-router-dom"

export const ResidentDetailService = GetServiceContext(useResidentDetailService)

export default function useResidentDetailService() {
	// 需要共享的数据
	/**
	 * 1. 住户详情
	 * 2.
	 */
	const { params } = useRouteMatch<{ id: string }>()
	// 住户详情
	const [{ data: residentDetail, loading }, _, updateMemo] = useMemoFetch({
		url: "/orgmgt/member/queryById",
		params: { id: params.id },
		cache: true,
		transform: (data) => data.result,
	})

	// 房间 树
	return {
		residentDetail,
		loading,
		updateMemo,
	}
}
