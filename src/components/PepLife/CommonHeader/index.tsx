import React, { memo, PropsWithChildren, ReactNode } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import GetIcon from "@/components/GetIcon"
import withDefaultProps from "@/hocs/withDefaultProps"
import useTypedSelector from "@/hooks/useTypedSelector"
import useTitle from "@/hooks/ui/useTitle"
// 派博 基础的 header
/**
 * 左侧的icon 和 title
 * 右侧的tabs
 */
interface CommonHeaderProps {
	icon?: ReactNode
	title: string
	ghost: boolean
	fixed: boolean // 是否固定
	extra?: React.ReactNode
}
function CommonHeader(props: PropsWithChildren<CommonHeaderProps>) {
	const { icon, title, ghost, fixed, children, extra } = props
	const collapsed = useTypedSelector((state) => state.menu.collapsed)
	useTitle(title)
	return (
		<div
			className={classNames(styles.common_header_wrap, {
				[styles.ghost]: ghost,
				[styles.fixed]: fixed,
				[styles.collapsed]: collapsed,
			})}
		>
			<header className={styles.header}>
				{icon && <GetIcon icon={icon} className={styles.icon} />}
				<span className={styles.common_header_title}>{title}</span>
			</header>
			<div className={styles.children}>{children}</div>
			<div className={styles.extra}>{extra}</div>
		</div>
	)
}
export default memo(
	withDefaultProps(CommonHeader, { ghost: false, fixed: false })
)
