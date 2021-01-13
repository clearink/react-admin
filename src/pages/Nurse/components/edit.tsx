import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput, ProFormRadio } from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"
import { phonePattern } from "@/utils/form/pattern"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/Form/BSAvatar"

function BedEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	const { id, ...rest } = props
	return (
		<EditForm
			{...rest}
			name='edit-nurse'
			ref={ref}
			request={{
				url: "/orgmgt/careWorker/queryById",
				params: { id },
			}}
			id={id}
		>
			<ProFormInput name='name' label='姓名' required />

			<ProFormInput
				name='mobile'
				label='联系电话'
				required
				rules={[{ pattern: phonePattern, message: "手机号格式不正确" }]}
			/>

			<ProFormInput name='position' label='职务' />
			<ProFormNumber name='age' label='年龄' required />
			<ProFormInput name='cardNum' label='身份证号' required />

			<BSAvatar name='avatar' label='头像' />
			<ProFormRadio
				name='gender'
				label='性别'
				options={["男", "女"]}
				initialValue='男'
				required
			/>
		</EditForm>
	)
}

export default memo(forwardRef(BedEditForm))
