import useMemoFetch from "@/hooks/useMemoFetch"
import GetService from "@/utils/store/GetService"
import { useRef, useState } from "react"

export const AlarmService = GetService(useAlarmService)

export default function useAlarmService() {
	const [alarmId, setAlarmId] = useState<string | undefined>(undefined)
	const alarmDetailRef = useRef<(() => void) | null>(null)
	const [{ data, loading }] = useMemoFetch({
		cache: true,
		method: "get",
		url: "/orgmgt/alarm/info",
		params: { pageNo: 1, pageSize: 5 },
		transform: (response, cache) => {
			if (cache) return response
			return response.result
		},
	})
	const open = (id?: string) => {
		setAlarmId(id)
		alarmDetailRef.current?.()
	}
	return { alarmId, setAlarmId, data, loading, alarmDetailRef, open }
}
