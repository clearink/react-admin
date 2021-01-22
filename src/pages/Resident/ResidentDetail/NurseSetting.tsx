import React, { useContext } from "react"
import styles from "./style.module.scss"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import { EditOutlined, UserOutlined } from "@ant-design/icons"
import { ResidentDetailService } from "./useResidentDetail.service"
import {
	FieldAvatar,
	ProFormGroup,
	ProFormInput,
	ProFormRadio,
	ProFormSelect,
} from "@/components/BigSight"
import { Button, Form, Radio } from "antd"

// 护管设置
function NurseSetting() {
	const service = useContext(ResidentDetailService)
	const nurseList: any[] = []
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
			<Form.Item label='人员选择' name='nurse'>
				<Radio.Group>
					{nurseList?.map((item: any) => {
						return (
							<div key={item.id}>
								<FieldAvatar icon={<UserOutlined />} text={item.avatar} />
								<div>{item.name}</div>
								<div>{item.position}</div>
								<Radio value={item.id} />
							</div>
						)
					})}
				</Radio.Group>
			</Form.Item>
			<ProFormRadio
				label='人员选择'
				options={[1, 2, 3, 4, 5, 6]}
				render={(props) => {
					return (
						<Radio.Group>
							{(props.options as any[]).map((item) => {
								return (
									<div key={item.value}>
										<FieldAvatar icon={<UserOutlined />} />
										<span>21</span>
									</div>
								)
							})}
						</Radio.Group>
					)
				}}
			/>
		</ModalForm>
	)
}
export default NurseSetting
