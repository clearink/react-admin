import React, { useContext } from "react"
import styles from "./style.module.scss"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import { EditOutlined, UserOutlined } from "@ant-design/icons"
import { ResidentDetailService } from "./useResidentDetail.service"
import {
	FieldAvatar,
	ProFormGroup,
	ProFormInput,
	ProFormSelect,
} from "@/components/BigSight"
import { Button, Empty, Form, Radio } from "antd"

// 护管设置
function NurseSetting() {
	const service = useContext(ResidentDetailService)
	const nurseList: any[] = [
		{
			id: "1",
			name: "233",
			position: "12213",
		},
		{
			id: "11",
			name: "233",
			position: "12213",
		},
		{
			id: "111",
			name: "233",
			position: "12213",
		},
	]
	return (
		<ModalForm
			layout='horizontal'
			title='护管设置'
			trigger={
				<span className={styles.user_nurse}>
					{service.residentDetail?.careWorkerName}
					<EditOutlined className={styles.icon} />
				</span>
			}
		>
			<ProFormGroup>
				<ProFormInput placeholder='姓名' label='人员查找' />
				<ProFormSelect
					placeholder='职务类型'
					request={{
						url: "/sys/dict/getDictItems/careworkerPosition",
						cache: true,
						transform: (response, cache) => {
							if (cache) return response
							return response.result.map((item: any) => ({
								label: item.text,
								value: item.value,
							}))
						},
					}}
				/>
				<Button type='primary'>查找</Button>
			</ProFormGroup>
			<Form.Item
				label='人员选择'
				name='nurse'
				rules={[{ required: true, message: "请选择护管" }]}
			>
				<Radio.Group>
					{nurseList?.map((item: any) => {
						return (
							<div key={item.id} className={styles.nurse_list_item}>
								<FieldAvatar icon={<UserOutlined />} text={item.avatar} />
								<div>{item.name}</div>
								<div>{item.position}</div>
								<Radio value={item.id} />
							</div>
						)
					})}
					{nurseList.length === 0 && <Empty />}
				</Radio.Group>
			</Form.Item>
		</ModalForm>
	)
}
export default NurseSetting
