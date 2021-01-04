import { ProTableColumns } from "@/components/Pro/ProTable/type"
import React, { useEffect } from "react"

export interface RenderDrawerFormProps {
	columns: ProTableColumns<any>[]
}
function RenderDrawerForm(props: RenderDrawerFormProps) {
	const { columns } = props
	useEffect(() => {
		/**
		 * 需要的数据
		 * 1. fieldType
		 * 2. fieldProps
		 * 4. hideInForm = true 自动舍弃
		 */
		columns.forEach((item) => {
			console.log(item)
		})
	}, [])
	return <div></div>
}

export default RenderDrawerForm
