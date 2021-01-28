import React, { memo, useEffect, useRef } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { notification } from "antd"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import {
	ProFormInput,
	ProFormRadio,
	ProFormSelect,
	ProFormTextArea,
} from "@/components/Pro/ProForm"
import ProFormDate from "@/components/Pro/ProForm/components/ProFormDate"
import { getRequiredRule } from "@/utils/form/FormRule"
import { CheckCircleOutlined, UserAddOutlined } from "@ant-design/icons"
import { FormInstance } from "antd/lib/form"
import http from "@/http"
import { BSAvatar, ProFormGroup } from "@/components/BigSight"

const updateUserDetail = (data: any) => http.post("/orgmgt/member/save", data)

// 用户详情
interface UserDetailProps {
	data?: any
}
function UserDetail(props: UserDetailProps) {
	const { data } = props
	const ref = useRef<FormInstance>(null)
	const handleFinish = async (values: any) => {
		await updateUserDetail(values)
		notification.success({
			message: "用户信息保存成功",
			placement: "bottomRight",
			key: "set user info",
		})
	}
	useEffect(() => {
		if (ref.current && data) {
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
					<BSAvatar name='avatar' />
					<ProFormInput formItemClassName='hidden' name='id' />
					<ProFormGroup>
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
					</ProFormGroup>
					<ProFormInput
						name='name'
						label='姓名'
						rules={getRequiredRule("姓名")}
					/>
					<div className='flex justify-between'>
						<ProFormInput
							name='mobile'
							label='手机号码'
							rules={getRequiredRule("手机号码")}
							formItemClassName='flex-auto'
						/>
						<span className='px-8' style={{ lineHeight: "32px" }}>
							<UserAddOutlined />
							认证
						</span>
					</div>
					<div className='flex justify-between'>
						<ProFormInput
							name='cardNum'
							label='身份证号'
							rules={getRequiredRule("身份证号")}
							formItemClassName='flex-auto'
						/>
						<span className='px-8' style={{ lineHeight: "32px" }}>
							<UserAddOutlined />
							认证
						</span>
					</div>

					<ProFormTextArea
						name={["memberProfile", "address"]}
						label='家庭住址'
						placeholder='请输入家庭住址'
						maxLength={300}
						showCount
						rows={4}
						rules={getRequiredRule("家庭住址")}
					/>
				</div>
				<div className='w-3/4 md:w-11/24'>
					<ProFormGroup
						title={{
							title: <header className={styles.info_header}>入住信息</header>,
						}}
					>
						<ProFormDate
							required
							label='入住时间'
							name={["memberProfile", "checkInTime"]}
						/>
						<ProFormDate
							label='退房时间'
							name={["memberProfile", "checkOutTime"]}
						/>
					</ProFormGroup>
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
					/>
					<ProFormInput
						label='联系人电话(二)'
						name={["memberProfile", "contactMobile2"]}
					/>
					<ProFormSelect
						label='关系类型(二)'
						name={["memberProfile", "contactRelation2"]}
						options={["子女", "亲属", "朋友"]}
					/>
				</div>
			</div>
		</BaseForm>
	)
}
export default memo(UserDetail)
