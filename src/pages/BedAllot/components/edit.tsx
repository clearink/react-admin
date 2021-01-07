import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput } from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/PepLife/EditForm"

function BedEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	return (
		<EditForm {...props} ref={ref}>
			<ProFormInput
				name='bedName'
				label='床位名称'
				rules={[undefined as any]}
			/>
		</EditForm>
	)
}

export default memo(forwardRef(BedEditForm))
