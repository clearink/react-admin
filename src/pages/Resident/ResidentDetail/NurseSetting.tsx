import React, { useCallback, useContext, useRef, useState } from "react"
import styles from "./style.module.scss"
import ModalForm, {
	ModalFormRef,
} from "@/components/Pro/ProForm/components/ModalForm"
import { EditOutlined, UserOutlined } from "@ant-design/icons"
import { ResidentDetailService } from "./useResidentDetail.service"
import {
	FieldAvatar,
	ProForm,
	ProFormGroup,
	ProFormInput,
	ProFormSelect,
} from "@/components/BigSight"
import { Button, Empty, Form, Radio } from "antd"
import NurseApi from "@/http/api/pages/NurseApi"
import removeEmpty from "@/utils/data/removeEmpty"

// 护管设置
function NurseSetting() {
	const service = useContext(ResidentDetailService)
	const formRef = useRef<ModalFormRef>(null)

	const [nurseList, setNurseList] = useState<any[]>([])
	const fetchData = useCallback(async (params: any) => {
		const { data } = await NurseApi.find({ ...params, pageSize: 100 })
		setNurseList(data.result.records ?? [])
	}, [])
	const handleSearch = () => {
		const values = formRef.current?.form.getFieldsValue(["name", "position"])
		fetchData(removeEmpty(values))
	}
	// 分配护管
	const handleFinish = async (values: any) => {
		console.log(values)
		await NurseApi.apply({
			memberId: service.residentDetail.id,
			orgCareWorkerId: values.orgCareWorkerId,
		})
		service.updateMemo()
		return true
	}
	return (
		<ModalForm
			ref={formRef}
			layout='horizontal'
			onFinish={handleFinish}
			title='护管设置'
			trigger={
				<span className={styles.user_nurse}>
					{service.residentDetail?.careWorkerName}
					<EditOutlined className={styles.icon} />
				</span>
			}
		>
			<ProFormGroup>
				<ProFormInput name='name' placeholder='姓名' />
				<ProFormSelect
					placeholder='职务类型'
					name='position'
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
				<Button type='primary' onClick={handleSearch}>
					查找护管
				</Button>
			</ProFormGroup>
			<Form.Item
				name='orgCareWorkerId'
				rules={[{ required: true, message: "请选择护管" }]}
			>
				<Radio.Group className={styles.group}>
					{nurseList?.map((item: any) => {
						return (
							<div
								key={item.id}
								className={styles.nurse_list_item}
								onClick={() => {
									formRef.current?.form.setFieldsValue({
										orgCareWorkerId: item.id,
									})
								}}
							>
								<span className={styles.nurse_info}>
									<FieldAvatar
										size={40}
										icon={<UserOutlined />}
										text={item.avatar}
									/>
									<div className={styles.name}>{item.name}</div>
									<div className={styles.position}>{item.position}</div>
								</span>
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
