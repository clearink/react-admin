import { EditForm, ProFormInput, ProFormSelect } from "@/components/BigSight"
import { EditFormProps, EditFormRef } from "@/components/BigSight/Form/EditForm"
import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
} from "react"

function DeviceEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	const formRef = useRef<EditFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	return (
		<EditForm
			type='modal'
			title='编辑设备'
			{...props}
			name='add-device'
			request={{
				url: "/orgmgt/device/queryById",
				params: { id: props.id },
				method: "get",
			}}
			ref={formRef}
		>
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
		</EditForm>
	)
}

export default memo(forwardRef(DeviceEditForm))
