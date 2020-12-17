import React, { useState } from "react"
import { Button } from "antd"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { FieldSelect } from "@/components/Pro/ProField"
import "./style.scss"
import { FieldMode } from "@/components/Pro/ProField/type"
import { isArray } from "@/utils/validate"

function WorkPlace(props: IBaseProps) {
	const [mode, setMode] = useState<FieldMode>("edit")

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
				<FieldSelect
					fetchUrl='/sys/dict/getDictItems/MEMBER_TYPE'
					fieldEnum={{
						open: {
							status: "success",
							text: "打开",
							color: "red",
							tag: true,
						},
						default: {
							status: "success",
							text: "关闭",
						},
					}}
					transform={(oo, fe) => {
						console.log(oo, fe)
						if (oo?.result && isArray(oo.result)) {
							return oo.result.map((item: any) => ({
								label: item.text,
								value: item.value,
							}))
						}
						return []
					}}
					text={["open", "default"]}
					mode={mode}
				/>
			</main>
		</div>
	)
}

export default WorkPlace
