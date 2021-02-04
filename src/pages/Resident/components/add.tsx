import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import moment, { Moment } from "moment"
import {
	ProFormDate,
	ProFormInput,
	ProFormRadio,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import AddForm, {
	AddFormProps,
	AddFormRef,
} from "@/components/BigSight/Form/AddForm"
import { phonePattern } from "@/utils/form/pattern"

function ResidentAddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const [birthDay, setBirthDay] = useState<Moment>(() => moment())
	const formRef = useRef<AddFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])
	return (
		<AddForm {...props} ref={formRef}>
			<ProFormInput name='name' label='姓名' required />

			<ProFormRadio
				required
				label='性别'
				name='gender'
				initialValue='男'
				options={["男", "女"]}
			/>
			<ProFormInput
				name='mobile'
				label='手机号'
				required
				rules={[{ pattern: phonePattern, message: "手机号格式不正确" }]}
			/>
			<ProFormInput name='cardNum' label='身份证号' />
			<ProFormDate
				name='birthday'
				label='出生日期'
				onChange={(value: any) => {
					// 重置 入住时间选择框

					// 如果出生日期晚于入住时间 清空 入住时间
					const liveDay = formRef.current?.form.getFieldValue([
						"memberProfile",
						"checkInTime",
					])
					if (value > liveDay)
						formRef.current?.form.setFields([
							{ name: ["memberProfile", "checkInTime"], value: undefined },
						])
					setBirthDay(value)
				}}
				disabledDate={(current) => current >= moment().endOf("D")}
				required
			/>

			<ProFormDate
				name={["memberProfile", "checkInTime"]}
				disabledDate={(current) =>
					current >= moment().endOf("D") || current <= birthDay
				}
				label='入住时间'
				required
			/>
			<ProFormTextArea
				rows={4}
				name={["memberProfile", "address"]}
				label='家庭住址'
			/>
			<ProFormTextArea rows={4} name='info' label='备注' />
		</AddForm>
	)
}

export default memo(forwardRef(ResidentAddForm))
