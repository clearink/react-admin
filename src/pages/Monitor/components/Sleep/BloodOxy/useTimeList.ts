import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import { useState } from "react"

export default function useTimeList(params: any, fetcher: any) {
	const [timeList, setTimeList] = useState<any[]>([])
	const [hasMore, setHasMore] = useState(true)
	const fetchData = useMemoCallback(async () => {
		const {
			data: { result },
		} = await fetcher(params)
		setTimeList((p) => p.concat(result.records))
		setHasMore(result.current < result.pages)
	})
	return {
		timeList,
		hasMore,
		fetchData,
	}
}
