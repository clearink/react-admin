import React, { useCallback, useContext, useRef, useState } from "react"
import styles from "./style.module.scss"
import ModalForm, {
	ModalFormRef,
} from "@/components/Pro/ProForm/components/ModalForm"
import { EditOutlined, UserOutlined } from "@ant-design/icons"
import { ResidentDetailService } from "./useResidentDetail.service"
import {
	FieldAvatar,
	FieldStatus,
	ProFormGroup,
	ProFormInput,
	ProFormRadio,
	ProFormSelect,
} from "@/components/BigSight"
import { Button, Radio } from "antd"
import NurseApi from "@/http/api/pages/NurseApi"
import removeEmpty from "@/utils/data/removeEmpty"
import { CommonServerData } from "@/components/BigSight/interface"
import useMemoFetch from "@/hooks/useMemoFetch"

const transformRadioOption = (response: CommonServerData, cache?: boolean) => {
	if (cache) return response
	return response.result.map((item: any) => ({
		label: item.text,
		value: item.value,
	}))
}

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

	// 获取职务类型
	const [{ data: nurseCategoryList }] = useMemoFetch({
		cache: true,
		url: "/sys/dict/getDictItems/careworkerPosition",
		transform: transformRadioOption,
	})

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
					options={nurseCategoryList}
				/>
				<Button type='primary' onClick={handleSearch}>
					查找护管
				</Button>
			</ProFormGroup>
			<ProFormRadio
				name='orgCareWorkerId'
				rules={[{ required: true, message: "请选择护管" }]}
				options={nurseList}
				render={(props) => {
					const { options, onChange } = props
					if (!options || options.length === 0) return <></>
					return (
						<>
							{(options as any[]).map((item: any) => (
								<div
									key={item.id}
									className={styles.nurse_list_item}
									onClick={() => onChange!(item.id)}
								>
									<span className={styles.nurse_info}>
										<FieldAvatar
											size={40}
											icon={<UserOutlined />}
											text={item.avatar}
										/>
										<div className={styles.name}>{item.name}</div>
										<FieldStatus
											statusList={["#1abc9c", "#e67e22"]}
											options={nurseCategoryList}
											text={item.position}
										/>
									</span>
									<Radio value={item.id} checked={item.id === props.value} />
								</div>
							))}
						</>
					)
				}}
			/>
		</ModalForm>
	)
}
export default NurseSetting
