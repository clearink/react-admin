import React, { forwardRef, memo, Ref } from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/AddForm"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/BSAvatar"
import { ProFormInput } from "@/components/Pro/ProForm"

function BedAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} name='add-bed' ref={ref}>
			<ProFormNumber name='age' label='年龄' required />
			<BSAvatar name='avatar' label='头像' required  />
			<ProFormInput name='bedName' label='床位名称' required />
			<ProFormInput name='roomName' label='房间名称' required />
			<ProFormInput name='floorName' label='楼层名称' required />
		</AddForm>
	)
}

export default memo(forwardRef(BedAddForm))
