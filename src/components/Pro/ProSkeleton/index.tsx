import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import SkeletonDetail from "./SkeletonDetail"
import SkeletonForm from "./SkeletonForm"

// 骨架屏
export interface ProSkeletonProps {
	/** 骨架屏类型 */
	type?: "detail" | "table" | "form"
	active?: boolean
	loading?: boolean
	size?: "small" | "large" | "default"
	/** 根据子元素的个数显示不同行 */
	row: number
}
const SkeletonMap = {
	detail: SkeletonDetail,
	table: SkeletonDetail,
	form: SkeletonForm,
}
function ProSkeleton(props: ProSkeletonProps) {
	const { type, ...rest } = props
	const SkeletonComponent = SkeletonMap[type!] ?? SkeletonDetail
	return <SkeletonComponent {...rest} />
}
export default memo(
	withDefaultProps(ProSkeleton, { type: "detail", size: "small", active: true })
)
