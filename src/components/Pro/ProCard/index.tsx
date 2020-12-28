import { CardProps } from "antd/lib/card"
import { Grid } from "antd"
import React, {
	Children,
	cloneElement,
	FunctionComponent,
	isValidElement,
	ReactNode,
	useMemo,
	useRef,
} from "react"
import classNames from "classnames"
import withDefaultProps from "@/hocs/withDefaultProps"
import styles from "./style.module.scss"
import { RowProps } from "antd/lib/row"
import { TitleTip } from "./components"

const { useBreakpoint } = Grid

// 模仿 antd pro component ProCard
/**
 *
 */
type ProCardType = FunctionComponent<IProCardProps> & {
	isProCard: boolean
}
type ProCardChildType = React.ReactElement<IProCardProps, ProCardType>

interface IProCardProps extends CardProps {
	bordered: boolean
	ghost: boolean
	direction: "row" | "column"
	layout: "center" | "default"
	gutter?: RowProps["gutter"]
	colSpan?: number
	tip?: string
	className?: string
	children?: ReactNode
}
function ProCard(props: IProCardProps) {
	const {
		title,
		tip,
		children,
		extra,
		className,
		bordered,
		style,
		size,
		direction,
		ghost,
	} = props
	let contain_card = useRef(false)

	// antd 自适应断点
	const screens = useBreakpoint()

	const renderChildren = useMemo(() => {
		return Children.map(children as ProCardChildType[], (child, index) => {
			if (!isValidElement(child)) return child
			if (child.type.isProCard) {
				contain_card.current = true
				console.log(child.props.colSpan)
				return cloneElement(child)
			}
			return child
		})
	}, [children])
	const cardClassName = classNames(styles.pro_card_container, className, {
		[styles.bordered]: bordered,
		[styles.small]: size === "small",
		[styles.ghost]: ghost,
	})
	const bodyCls = classNames(styles.card_body, {
		[styles.contain_card]: contain_card.current,
		[styles.body_column]: direction === "column",
	})
	return (
		<div className={cardClassName} style={style}>
			<div className={styles.card_head}>
				<div className={styles.card_head_wrap}>
					<div className={styles.head_title}>
						{title && <TitleTip title={{ title, tooltip: tip }} />}
					</div>
					<div className={styles.head_extra}>{extra}</div>
				</div>
			</div>
			<div className={bodyCls}>{renderChildren}</div>
		</div>
	)
}
ProCard.isProCard = true
export default withDefaultProps(ProCard, {
	bordered: false,
	ghost: false,
	direction: "row",
	layout: "center",
})
