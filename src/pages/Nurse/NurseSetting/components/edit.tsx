import React, { forwardRef, memo, Ref } from "react"
import {
	ProFormInput,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"
import { phonePattern } from "@/utils/pattern"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import BSAvatar from "@/components/BigSight/Form/BSAvatar"

function NurseSettingEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	const { id, ...rest } = props
	return (
		<EditForm
			{...rest}
			name='edit-nurse'
			ref={ref}
			request={{
				url: "/orgmgt/carePlan/queryById",
				params: { id },
			}}
			id={id}
		>
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
		</EditForm>
	)
}

export default memo(forwardRef(NurseSettingEditForm))
