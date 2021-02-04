import { EditForm } from "@/components/BigSight"
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
      title="编辑设备"
			{...props}
			name='add-device'
			request={{
				url: "/orgmgt/device/queryById",
				params: { id: props.id },
				method: "get",
			}}
			ref={formRef}
		></EditForm>
	)
}

export default memo(forwardRef(DeviceEditForm))
