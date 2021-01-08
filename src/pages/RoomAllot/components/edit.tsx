import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput } from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/EditForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import ProFormBsTreeSelect from "@/components/BigSight/BSTreeSelect"
import { convertTreeNode } from "@/pages/BedAllot/utils"

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
			<ProFormGroup>
				<ProFormInput name='num' label='床位名称' required />
				<ProFormBsTreeSelect
					name='orgBuildingId'
					width='l'
					label='所属楼层'
					request={{
						url: "/orgmgt/building/treeList",
						method: "post",
						transform: (response) => {
							if (response.success) {
								return convertTreeNode(response.result, "orgBuildings")
							}
							if (response) return response
							return []
						},
					}}
				/>
			</ProFormGroup>
		</EditForm>
	)
}

export default memo(forwardRef(RoomEditForm))
