import React, { forwardRef, memo, Ref } from "react"
import {
	ProFormInput,
	ProFormRadio,
	ProFormSelect,
} from "@/components/Pro/ProForm"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/Form/BSAvatar"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { phonePattern } from "@/utils/form/pattern"

function NurseAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} name='add-nurse' ref={ref}>
			<ProFormInput name='name' label='姓名' required />
			<ProFormInput
				name='mobile'
				label='联系电话'
				required
				rules={[{ pattern: phonePattern, message: "手机号格式不正确" }]}
			/>
			<ProFormSelect
				required
				name='position'
				label='职务'
				request={{
					url: "/sys/dict/getDictItems/careworkerPosition",
					cache: true,
					transform: (response, cache) => {
						if (cache) return response
						return response.result.map((item: any) => ({
							label: item.text,
							value: item.value,
						}))
					},
				}}
			/>
			<ProFormNumber name='age' label='年龄' required />
			<ProFormInput name='cardNum' label='身份证号' required />
			<BSAvatar name='avatar' label='头像' className='mr-4' />
			<ProFormRadio
				name='gender'
				label='性别'
				options={["男", "女"]}
				initialValue='男'
				required
			/>
		</AddForm>
	)
}

export default memo(forwardRef(NurseAddForm))
