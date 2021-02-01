import React, { forwardRef, memo, Ref } from "react"
import { ProFormInput } from "@/components/Pro/ProForm"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import { convertTreeNode } from "@/pages/BedAllot/utils"
import { BSTreeSelect } from "@/components/BigSight"

function RoomEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	return (
		<EditForm
			{...props}
			request={{
				url: "/orgmgt/room/queryById",
				params: { id: props.id },
			}}
			name='update room form'
			ref={ref}
		>
			<ProFormGroup>
				<BSTreeSelect
					name='orgBuildingId'
					width='l'
					label='选择'
					request={{
						method: "post",
						url: "/orgmgt/building/tree",
						transform: (response, cache) => {
							console.log("cache", cache)
							if (cache) return response
							return convertTreeNode(response.result, "orgBuildings") ?? []
						},
					}}
				/>
				<ProFormInput name='num' label='房间编号' required />
			</ProFormGroup>
		</EditForm>
	)
}

export default memo(forwardRef(RoomEditForm))
