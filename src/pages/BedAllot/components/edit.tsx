import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"
import { BSTreeSelect, ProFormGroup, ProFormInput } from "@/components/BigSight"
import { convertRoomTree } from "../utils"

function BedEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	const formRef = useRef<EditFormRef>(null)
	const [buildingId, setBuildingId] = useState<string | undefined>(undefined)
	useImperativeHandle(ref, () => formRef.current!, [])
	useEffect(() => {
		formRef.current?.form.setFieldsValue({ num: undefined })
	}, [buildingId])
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
			onFieldsChange={() => {
				const newId = formRef.current?.form.getFieldValue("orgBuildingId")
				setBuildingId(newId)
			}}
		>
			{/* <ProFormGroup> */}
			{/* <BSTreeSelect
					name='orgRoomId'
					label='选择房间'
					required
					request={{
						url: "/orgmgt/room/tree",
						method: "post",
						transform: (response, cache) => {
							if (cache) return response
							return convertRoomTree(response.result, "childList") ?? []
						},
					}}
				/> */}
			<ProFormInput name='num' label='床位编号' required />
			{/* </ProFormGroup> */}
		</EditForm>
	)
}

export default memo(forwardRef(BedEditForm))
