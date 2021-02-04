import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
} from "react"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"

function BedEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	const formRef = useRef<EditFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	return (
		<EditForm
			{...props}
			request={{
				url: "/orgmgt/bed/queryById",
				params: { id: props.id },
				method: "get",
			}}
			name='edit-bed'
			ref={formRef}
		></EditForm>
	)
}

export default memo(forwardRef(BedEditForm))
