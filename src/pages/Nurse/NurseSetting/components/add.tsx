import React, { forwardRef, memo, Ref } from "react"
import {
	ProFormInput,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/Form/BSAvatar"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"

function NurseSettingAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} name='add-nurse' ref={ref}>
			<ProFormInput name='name' label='方案名称' required />
			<ProFormRadio
				name='enabled'
        label='状态'
        initialValue={true}
				options={[
					{ label: "启用", value: true },
					{ label: "禁用", value: false },
				]}
			/>
			<ProFormNumber name='price' label='价格' required min={0} />
			<ProFormInput name='introduction' label='方案简介' />
			<ProFormTextArea name='content' label='护理内容' rows={6} />
		</AddForm>
	)
}

export default memo(forwardRef(NurseSettingAddForm))
