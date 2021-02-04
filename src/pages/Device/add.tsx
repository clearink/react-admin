import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
} from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { ProFormInput, ProFormSelect } from "@/components/BigSight"

function DeviceAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const formRef = useRef<AddFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	return (
		<AddForm type='modal' title="新增设备" {...props} name='add-device' ref={formRef}>
			<ProFormSelect
				label='设备类型'
				name='deviceType'
				request={{
					url: "/sys/dict/getDictItems/device_type",
					transform: (response, cache) => {
						if (cache) return response
						return response.result?.map((item: any) => ({
							label: item.text,
							value: item.value,
						}))
					},
				}}
			/>

			<ProFormSelect
				label='设备型号'
				name='modelNum'
				request={{
					url: "/sys/dict/getDictItems/device_module",
					transform: (response, cache) => {
						if (cache) return response
						return response.result?.map((item: any) => ({
							label: item.text,
							value: item.value,
						}))
					},
				}}
			/>
			<ProFormInput label='设备编号' name='num' required />
		</AddForm>
	)
}

export default memo(forwardRef(DeviceAddForm))
