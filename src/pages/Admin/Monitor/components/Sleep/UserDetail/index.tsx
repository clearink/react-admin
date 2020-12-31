import React, { memo, useEffect, useRef } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { DatePicker, Form, Input, Radio, Select } from "antd"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import {
	ProFormInput,
	ProFormRadio,
	ProFormSelect,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import ProFormDate from "@/components/Pro/ProForm/components/ProFormDate"
import { getRequiredRule } from "@/utils/generatorFormRule"
import { CheckCircleOutlined } from "@ant-design/icons"
import { FormInstance } from "antd/lib/form"
import http from "@/http"
import { isString } from "@/utils/validate"

const updateUserDetail = (data: any) => http.post("/orgmgt/member/save", data)

// 用户详情
interface UserDetailProps {
	data?: any
}
function UserDetail(props: UserDetailProps) {
	const { data } = props
	const ref = useRef<FormInstance | null>(null)
	const handleFinish = async (values: any) => {
		const { birthday, ...rest } = values

		await updateUserDetail({
			...rest,
			id: data.id,
			birthday: isString(birthday) ? birthday : birthday.format("YYYY-MM-DD"),
		})
	}
	useEffect(() => {
		if (ref.current && data) {
			console.log("设置formvalue")
			ref.current.setFieldsValue(data)
		}
	}, [data])
	return (
		<BaseForm
			ref={ref}
			className='w-full px-4'
			onFinish={handleFinish}
			submitConfig={{
				submitProps: {
					text: "保存",
					size: "large",
					icon: <CheckCircleOutlined />,
					className: "px-12",
				},
				render: (dom) => <div className='text-center'>{dom.pop()}</div>,
			}}
		>
			<div className='flex flex-col md:flex-row items-center md:justify-between'>
				<div className='w-3/4 md:w-11/24'>
					<header className={styles.info_header}>住户信息</header>
					<div className='flex justify-between'>
						<ProFormRadio
							name='gender'
							label='性别'
							options={["男", "女"]}
							initialValue='男'
							rules={[{ required: true, message: "请选择性别" }]}
						/>
						<ProFormDate
							name='birthday'
							label='出生年月'
							rules={[{ required: true, message: "请选择日期" }]}
						/>
					</div>
					<ProFormInput
						name='name'
						label='姓名'
						rules={getRequiredRule("姓名")}
					/>
					<ProFormInput
						name='mobile'
						label='手机号码'
						rules={getRequiredRule("手机号码")}
					/>
					<ProFormInput
						name='cardNum'
						label='身份证号'
						rules={getRequiredRule("身份证号")}
					/>
					<ProFormTextArea
						name={["memberProfile", "address"]}
						label='家庭住址'
						rules={getRequiredRule("家庭住址")}
					/>
				</div>
				<div className='w-3/4 md:w-11/24'>
					<header className={styles.info_header}>紧急联系人信息</header>
					<ProFormInput
						label='联系人(一)'
						name={["memberProfile", "contactName1"]}
						rules={getRequiredRule("联系人(一)")}
					/>
					<ProFormInput
						label='联系人电话(一)'
						name={["memberProfile", "contactMobile1"]}
						rules={getRequiredRule("联系人电话(一)")}
					/>
					<ProFormSelect
						label='关系类型(一)'
						name={["memberProfile", "contactRelation1"]}
						options={["子女", "亲属", "朋友"]}
						rules={getRequiredRule("关系类型(一)")}
					/>

					<ProFormInput
						label='联系人(二)'
						name={["memberProfile", "contactName2"]}
						rules={getRequiredRule("联系人(二)")}
					/>
					<ProFormInput
						label='联系人电话(二)'
						name={["memberProfile", "contactMobile2"]}
						rules={getRequiredRule("联系人电话(二)")}
					/>
					<ProFormSelect
						label='关系类型(二)'
						name={["memberProfile", "contactRelation2"]}
						options={["子女", "亲属", "朋友"]}
						rules={getRequiredRule("关系类型(二)")}
					/>
				</div>
			</div>
		</BaseForm>
	)
}
export default memo(UserDetail)
