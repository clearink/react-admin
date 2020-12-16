import React, { useState } from "react"
import { Space, Avatar, Button, InputNumber, Select } from "antd"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import {
	FieldAvatar2,
	FieldCheckbox2,
	FieldDigit2,
	FieldMoney2,
	FieldPercent2,
	FieldProgress2,
	FieldRadio2,
	FieldRate2,
	FieldSelect2,
	FieldText2,
} from "@/components/Pro/ProField2"
import "./style.scss"
import { UserOutlined } from "@ant-design/icons"
import { FieldMode } from "@/components/Pro/ProField2/type"
import useFetchData from "@/hooks/useFetchData"

function WorkPlace(props: IBaseProps) {
	const [mode, setMode] = useState<FieldMode>("read")

	return (
		<div className='dashboard_page__wrap h-full flex flex-col'>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<div className='p-10'>
				<Button
					onClick={() => {
						setMode(mode === "read" ? "edit" : "read")
					}}
				>
					change
				</Button>
			</div>
			<main className='bg-white p-20 flex-auto m-10'>
				<Space direction='vertical'>
					<FieldText2 text='-' mode={mode} />
					<FieldAvatar2 text='121' icon={<UserOutlined />} mode={mode} />
					<FieldMoney2 text='10022' mode={mode} />
					<FieldDigit2 text='12031231231' mode={mode} />
					<FieldPercent2 text={40} mode={mode} />
					<FieldRate2 text={3} mode={mode} />
					<FieldSelect2
						text={["open", "all"]}
						// fetchUrl='/sys/permission/queryMenu'
						mode={mode}
						fieldEnum={{
							all: { text: "全部", disabled: true, status: "default" },
							open: {
								text: "未解决",
								status: "error",
							},
							closed: {
								text: "已解决",
								status: "success",
							},
							processing: {
								text: "解决中",
								status: "processing",
							},
						}}
					/>

					<FieldCheckbox2
						text={["open", "all"]}
						// fetchUrl='/sys/permission/queryMenu'
						mode={mode}
						fieldEnum={{
							all: { text: "全部", disabled: true, status: "default" },
							open: {
								text: "未解决",
								status: "error",
							},
							closed: {
								text: "已解决",
								status: "success",
							},
							processing: {
								text: "解决中",
								status: "processing",
							},
						}}
					/>

					<FieldRadio2
						text='open'
						// fetchUrl='/sys/permission/queryMenu'
						mode={mode}
						fieldEnum={{
							all: { text: "全部", disabled: true, status: "default" },
							open: {
								text: "未解决",
								status: "error",
							},
							closed: {
								text: "已解决",
								status: "success",
							},
							processing: {
								text: "解决中",
								status: "processing",
							},
						}}
					/>
					<FieldProgress2 steps={10} text={40} mode={mode} />
				</Space>
			</main>
		</div>
	)
}

export default WorkPlace
