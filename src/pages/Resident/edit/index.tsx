import EditForm from "@/components/PepLife/EditForm"
import { ProFormInput, ProFormRadio } from "@/components/Pro/ProForm"
import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import ProFormDate from "@/components/Pro/ProForm/components/ProFormDate"
import ProFormNumber from "@/components/Pro/ProForm/components/ProFormNumber"
import ProSkeleton from "@/components/Pro/ProSkeleton"
import withDefaultProps from "@/hocs/withDefaultProps"
import { useFetchDataProps } from "@/hooks/useMemoFetch"
import React, { forwardRef, memo, Ref } from "react"

export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
	request?: useFetchDataProps
	id?: string
}
function ResidentEditForm(props: AddFormProps, ref: Ref<DrawerFormRef>) {
	console.log('function ResidentEditForm(props: AddFormProps, ref: Ref<DrawerFormRef>) {',props);
	return (
		<EditForm {...props} ref={ref}>
			<ProFormInput label='姓名' name='name' />
			<ProFormRadio label='性别' name='gender' options={["男", "女"]} />
			<ProFormDate label='生日' name='birthday' />
			<ProFormNumber label='年龄' name='age' />
			<ProFormInput label='身份证号' name='cardNum' />
		</EditForm>
	)
}

export default memo(
	withDefaultProps(forwardRef(ResidentEditForm), {
		type: "drawer",
		trigger: null,
	})
)
