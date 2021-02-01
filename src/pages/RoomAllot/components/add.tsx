import React, { forwardRef, memo, Ref } from "react"

import { ProFormInput } from "@/components/Pro/ProForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import BSTreeSelect from "@/components/BigSight/Form/BSTreeSelect"
import { convertRoomTree } from "@/pages/BedAllot/utils"

function RoomAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	return (
		<AddForm {...props} ref={ref} name='add room form'>
			<ProFormGroup>
				<BSTreeSelect
					name='orgBuildingId'
					width='l'
					label='选择楼层'
					request={{
						url: "/orgmgt/building/tree",
						method: "post",
						transform: (response, cache) => {
							if (cache) return response
							return convertRoomTree(response.result, "childList") ?? []
						},
					}}
				/>
				<ProFormInput name='num' label='房间编号' required />
			</ProFormGroup>
		</AddForm>
	)
}

export default memo(forwardRef(RoomAddForm))
