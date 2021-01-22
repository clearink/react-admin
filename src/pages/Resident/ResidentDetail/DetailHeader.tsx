import { FieldAvatar } from "@/components/BigSight"
import { UserOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React, { useContext } from "react"
import BedSetting from "./BedSetting"
import NurseSetting from "./NurseSetting"
import styles from "./style.module.scss"
import { ResidentDetailService } from "./useResidentDetail.service"

function DetailHeader() {
	const service = useContext(ResidentDetailService)
	return (
		<Spin spinning={service.loading}>
			<div
				className={
					"p-8 bg-white flex items-center justify-between flex-col md:flex-row"
				}
			>
				<FieldAvatar
					text={service.residentDetail?.avatar}
					size={80}
					icon={<UserOutlined />}
				/>
				<div className={styles.user_info}>
					<div className='font-bold flex-shrink-0 w-20'>
						{service.residentDetail?.name}
					</div>
					<div className='flex justify-between flex-shrink-0'>
						<span>{service.residentDetail?.gender}</span>
						<span className='ml-4'>{service.residentDetail?.age}岁</span>
					</div>
				</div>
				<div className={styles.bed_info}>
					<span>
						入住房间: <BedSetting />
					</span>
					<span>
						护管人员: <NurseSetting />
					</span>
				</div>
			</div>
		</Spin>
	)
}
export default DetailHeader
