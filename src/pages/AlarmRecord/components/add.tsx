import React, { forwardRef, memo, Ref } from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { ProFormInput } from "@/components/Pro/ProForm"
function AddAlarmForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref}>
			<ProFormInput name='name' label='姓名' required />
		</AddForm>
	)
}

export default memo(forwardRef(AddAlarmForm))
