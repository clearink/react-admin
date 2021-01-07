import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput } from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/PepLife/EditForm"

function RoomEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	return (
		<EditForm
			{...props}
			request={{
				url: "/orgmgt/room/member/queryByRoomId",
				params: { id: props.id },
			}}
			name='update room form'
			ref={ref}
		>
			<ProFormInput name='bedName' label='床位名称' required />
			<ProFormInput name='floor' label='所属楼层' required />
		</EditForm>
	)
}

export default memo(forwardRef(RoomEditForm))
