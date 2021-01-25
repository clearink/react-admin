import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput, ProFormRadio } from "@/components/Pro/ProForm"
import ProFormDate from "@/components/Pro/ProForm/components/ProFormDate"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"

function ResidentEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	const { id, ...rest } = props

	return (
		<EditForm
			{...rest}
			ref={ref}
			id={id}
			request={{
				url: "/orgmgt/member/queryById",
				params: { id },
				method: "get",
			}}
		>
			<ProFormInput label='姓名' name='name' />
			<ProFormRadio label='性别' name='gender' options={["男", "女"]} />
			<ProFormDate label='生日' name='birthday' />
			{/* <ProFormNumber label='年龄' name='age' /> */}
			<ProFormInput label='身份证号' name='cardNum' />
		</EditForm>
	)
}

export default memo(forwardRef(ResidentEditForm))
