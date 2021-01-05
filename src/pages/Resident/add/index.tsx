import AddForm from "@/components/PepLife/AddForm"
import { ProFormInput, ProFormRadio } from "@/components/Pro/ProForm"
import {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import { ModalFormRef } from "@/components/Pro/ProForm/components/ModalForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import withDefaultProps from "@/hocs/withDefaultProps"
import React, { forwardRef, memo, Ref } from "react"

export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
}
export type AddFormRef = DrawerFormRef | ModalFormRef
function ResidentAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref}>
			<ProFormGroup>
				{/* <ProFormAvatar label='头像' name='avatar' /> */}
				<ProFormInput label='姓名' name='name' width='m' />
				<ProFormInput label='护管' name='nurse' width='m' />
				<ProFormNumber label='年龄' name='age' width='xs' />
				<ProFormRadio
					label='性别'
					name='gender'
					initialValue='男'
					options={["男", "女"]}
				/>
				<ProFormInput label='手机' name='mobile' />
				<ProFormInput label='紧急联系电话' name='contactNumber' width='s' />
				<ProFormInput label='入住房间' name='roomName' width='m' />
			</ProFormGroup>
		</AddForm>
	)
}

export default memo(
	withDefaultProps(forwardRef(ResidentAddForm), {
		type: "drawer",
		trigger: null,
	})
)
