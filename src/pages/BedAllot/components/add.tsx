import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { BSTreeSelect, ProFormGroup, ProFormInput } from "@/components/BigSight"
import { convertRoomTree } from "../utils"

function BedAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const formRef = useRef<AddFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	return (
		<AddForm {...props} name='add-bed' ref={formRef}>
			<ProFormGroup>
				<BSTreeSelect
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
				/>
				<ProFormInput name='num' label='床位名称' required />
			</ProFormGroup>
		</AddForm>
	)
}

export default memo(forwardRef(BedAddForm))
