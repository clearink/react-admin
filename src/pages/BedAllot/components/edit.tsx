import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import EditForm, {
	EditFormProps,
	EditFormRef,
} from "@/components/BigSight/Form/EditForm"
import { BSTreeSelect, ProFormGroup, ProFormInput } from "@/components/BigSight"
import { convertTreeNode } from "../utils"

function BedEditForm(props: EditFormProps, ref: Ref<EditFormRef>) {
	// 这里可以传入 request 对象
	const { id, ...rest } = props
	const formRef = useRef<EditFormRef>(null)
	const [buildingId, setBuildingId] = useState<string | undefined>(undefined)
	useImperativeHandle(ref, () => formRef.current!, [])
	useEffect(() => {
		formRef.current?.form.setFieldsValue({ num: undefined })
	}, [buildingId])
	return (
		<EditForm
			{...rest}
			id={id}
			request={{
				url: "/orgmgt/bed/queryById",
				params: { id },
				method: "get",
			}}
			name='edit-bed'
			ref={formRef}
			onFieldsChange={() => {
				const newId = formRef.current?.form.getFieldValue("orgBuildingId")
				setBuildingId(newId)
			}}
		>
			<ProFormGroup>
				<BSTreeSelect
					name='orgBuildingId'
					label='楼层名称'
					required
					request={{
						url: "/orgmgt/building/treeList",
						method: "post",
						transform: (response, cache) => {
							if (cache) return response
							return convertTreeNode(response.result, "orgBuildings") ?? []
						},
					}}
				/>
				<BSTreeSelect
					name='orgRoomId'
					label='房间名称'
					required
					request={{
						cache: false,
						url: buildingId ? "/orgmgt/room/list/queryByBuildingId" : undefined,
						params: { id: buildingId },
						method: "get",
						transform: (response, cache) => {
							if (cache) return response
							return response.result.map((item: any) => ({
								label: item.num,
								value: item.id,
							}))
						},
					}}
				/>
			</ProFormGroup>
			<ProFormInput name='num' label='床位名称' required />
		</EditForm>
	)
}

export default memo(forwardRef(BedEditForm))
