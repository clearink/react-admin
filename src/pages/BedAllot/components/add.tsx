import React, { forwardRef, memo, Ref } from "react"
import AddForm, { AddFormProps, AddFormRef } from "@/components/PepLife/AddForm"
import { ProFormInput } from "@/components/Pro/ProForm"

function BedAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref}>
			<ProFormInput name='bedName' label='床位名称' required />
			<ProFormInput name='roomName' label='房间名称' required />
			<ProFormInput name='floorName' label='楼层名称' required />
		</AddForm>
	)
}

export default memo(forwardRef(BedAddForm))
