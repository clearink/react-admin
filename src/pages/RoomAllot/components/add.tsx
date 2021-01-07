import React, { forwardRef, memo, Ref } from "react"

import { ProFormInput } from "@/components/Pro/ProForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import AddForm, { AddFormProps, AddFormRef } from "@/components/BigSight/AddForm"

function RoomAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref} name='add room form'>
			<ProFormGroup>
				<ProFormInput name='bedName' label='床位名称' required />
				<ProFormInput name='floor' label='所属楼层' required />
			</ProFormGroup>
		</AddForm>
	)
}

export default memo(forwardRef(RoomAddForm))
