import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput, ProFormRadio } from "@/components/Pro/ProForm"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/Form/BSAvatar"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import AddForm, { AddFormProps, AddFormRef } from "@/components/BigSight/Form/AddForm"
import { phonePattern } from "@/utils/pattern"

function NurseAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} name='add-nurse' ref={ref}>
			<ProFormGroup>
				<ProFormInput name='name' label='姓名' required />

				<ProFormInput
					name='mobile'
					label='联系电话'
					required
					rules={[{ pattern: phonePattern, message: "手机号格式不正确" }]}
				/>
			</ProFormGroup>

			<ProFormGroup>
				<ProFormInput name='position' label='职务' />
				<ProFormNumber name='age' label='年龄' required />
				<ProFormInput name='cardNum' label='身份证号' required />
			</ProFormGroup>

			<ProFormGroup>
				<ProFormRadio
					name='gender'
					label='性别'
					options={["男", "女"]}
					initialValue='男'
					required
				/>
				<BSAvatar name='avatar' label='头像' />
			</ProFormGroup>
		</AddForm>
	)
}

export default memo(forwardRef(NurseAddForm))
