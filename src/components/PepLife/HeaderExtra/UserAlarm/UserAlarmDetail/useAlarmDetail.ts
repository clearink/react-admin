import useMemoFetch from "@/hooks/useMemoFetch"
import AlarmApi from "@/http/api/pages/AlarmApi"
import { useImperativeHandle, useRef, Ref, useEffect, useContext } from "react"
import GetService from "@/utils/store/GetService"
import { ModalFormRef } from "@/components/Pro/ProForm/components/ModalForm"
import { AlarmService } from "../useAlarmService"

export const AlarmDetailService = GetService(useAlarmDetailService)

export default function useAlarmDetailService(
	ref: Ref<(() => void) | undefined>
) {
	const modalRef = useRef<ModalFormRef>(null)
	const alarmService = useContext(AlarmService)
	useImperativeHandle(ref, () => modalRef.current?.toggle, [])
	const id = alarmService?.alarmId
	const [{ data, loading }] = useMemoFetch({
		url: id ? "/orgmgt/alarm/queryById" : undefined,
		params: { id },
		transform: (response) => {
			return response?.result
		},
	})
	useEffect(() => {
		if (!id || !data) return
		modalRef.current?.form.setFieldsValue(data)
	}, [id, data])

	const handleSubmit = async (values: any) => {
		await AlarmApi.CheckAlarm({ id, ...values })
		return true
	}

	return { modalRef, handleSubmit, data, loading }
}
