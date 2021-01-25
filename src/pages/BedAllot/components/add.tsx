import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { BSTreeSelect, ProFormGroup, ProFormInput } from "@/components/BigSight"
import { convertTreeNode } from "../utils"

function BedAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const formRef = useRef<AddFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	const [id, setId] = useState<string | undefined>(undefined)
	useEffect(() => {
		formRef.current?.form.setFieldsValue({ num: undefined })
	}, [id])
	return (
		<AddForm
			{...props}
			name='add-bed'
			ref={formRef}
			onFieldsChange={() => {
				const newId = formRef.current?.form.getFieldValue("orgBuildingId")
				setId(newId)
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
						url: id ? "/orgmgt/room/list/queryByBuildingId" : undefined,
						params: { id },
						method: "get",
						transform: (response, cache) => {
							if (cache) return response
							return response.result?.map((item: any) => ({
								label: item.num,
								value: item.id,
							}))
						},
					}}
				/>
			</ProFormGroup>
			<ProFormInput name='num' label='床位名称' required />
		</AddForm>
	)
}

export default memo(forwardRef(BedAddForm))
