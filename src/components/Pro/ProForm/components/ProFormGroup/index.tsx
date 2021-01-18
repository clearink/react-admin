import React, { memo, ReactNode, useMemo, Children } from "react"
import TitleTip, { TitleTipProps } from "@/components/Pro/components/TitleTip"
import classNames from "classnames"
import styles from "./style.module.scss"

export interface ProFormGroupProps {
	title?: TitleTipProps["title"]
	renderTitle?: (title: ProFormGroupProps["title"]) => JSX.Element
	children?: ReactNode
	vertical?: boolean
}
function ProFormGroup(props: ProFormGroupProps) {
	const { title, renderTitle, children, vertical } = props

	const groupTitle = useMemo(() => {
		if (renderTitle) return renderTitle(title)
		return title && <TitleTip title={title} />
	}, [renderTitle, title])

	return (
		<div className={styles.form_group_wrapper}>
			{title && <div className={styles.form_group_title}>{groupTitle}</div>}
			<div className={classNames(styles.child_wrap, { "flex-col": vertical })}>
				{Children.map(children, (child, index) => {
					return (
						<div key={index} className={styles.child}>
							{child}
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default ProFormGroup
