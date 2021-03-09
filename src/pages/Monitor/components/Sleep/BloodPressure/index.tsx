import React from "react"
import { Card } from "antd"
import styles from "./style.module.scss"
import useMemoFetch from "@/hooks/useMemoFetch"
import { BulbOutlined } from "@ant-design/icons"
import TimeSelect from "../components/TimeSelect"

// 血压
function BloodPressure() {
	// const {} = useMemoFetch({
	// 	url: "",
	// })
	return (
		<div className={styles.blood_oxy_page_wrap}>
			<Card
				size='small'
				className={styles.history}
				title={<div className={styles.header}>历史记录</div>}
			>
				<TimeSelect
					render={(data) => {
						return (
							<div
								onClick={() => {
									console.log(data)
								}}
							>
								1
							</div>
						)
					}}
				/>
			</Card>
			<Card
				size='small'
				className={styles.test_time}
				title={
					<div className={styles.header}>
						检测时间：2021年03月03日 星期三 上午10:35
					</div>
				}
			></Card>
			<Card
				size='small'
				className={styles.about_blood_pressure}
				title={
					<div className={styles.header}>
						<BulbOutlined className={styles.icon} />
						关于血压
					</div>
				}
			>
				血压是指心脏输送血液时血流对动脉壁产生的压力。有两种测量方式。“收缩压”是指心脏跳动时输送血液所产生的血压。“舒张压”是指心脏跳动间隔心脏舒张处于静止时所产生的血压。血压值通常会将收缩压数值写在舒张压数字的上面或前面（例如：120/80）。
			</Card>
		</div>
	)
}
export default BloodPressure
