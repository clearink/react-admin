import React, { forwardRef, memo, Ref } from "react"
import {
	ProFormInput,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/AddForm"
import { BSAvatar } from "@/components/BigSight"
import ProFormDate from "@/components/Pro/ProForm/components/ProFormDate"

function ResidentAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref}>
			<ProFormInput name='name' label='姓名' required />

			<ProFormRadio
				required
				label='性别'
				name='gender'
				initialValue='男'
				options={["男", "女"]}
			/>
			<ProFormInput name='mobile' label='手机号' required />
			<ProFormInput name='cardNum' label='身份证号' />
			<ProFormDate name='birthday' label='出生日期' required />
			<ProFormDate name='time' label='入住时间' required />
			<ProFormTextArea rows={4} name='address' label='家庭住址' />
			<ProFormTextArea rows={4} name='info' label='备注' />
		</AddForm>
	)
}

export default memo(forwardRef(ResidentAddForm))
