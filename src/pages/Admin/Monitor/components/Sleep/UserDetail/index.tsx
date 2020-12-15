import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { DatePicker, Form, Input, Radio } from "antd"

// 用户详情
function UserDetail() {
	return (
		<div className='flex w-full justify-between'>
			<div className='w-11/24'>
				<header className={styles.info_header}>住户信息</header>
				<Form className='p-12' labelCol={{ span: 4 }}>
					<div className='justify-between lg:flex'>
						<Form.Item
							name='sex'
							className='w-1/2'
							required
							label='性别'
							labelCol={{ span: 8 }}
						>
							<Radio.Group defaultValue='male'>
								<Radio value='male'>男</Radio>
								<Radio value='female'>女</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							labelCol={{ span: 8 }}
							label='出生年月'
							name='birthDay'
							rules={[
								{
									required: true,
									message: "请选择",
								},
							]}
						>
							<DatePicker placeholder='' />
						</Form.Item>
					</div>

					<Form.Item name='name' label='姓名' required>
						<Input />
					</Form.Item>
					<Form.Item name='phone' required label='手机号码'>
						<Input />
					</Form.Item>
					<Form.Item name='id' required label='身份证号'>
						<Input />
					</Form.Item>
					<Form.Item name='address' required label='家庭住址'>
					<Input.TextArea
							placeholder='请输入家庭住址'
							rows={8}
							showCount
							maxLength={100}
						/>
					</Form.Item>
				</Form>
			</div>
			<div className='w-11/24'>
				<header className={styles.info_header}>紧急联系人信息</header>
			</div>
		</div>
	)
}
export default memo(UserDetail)
