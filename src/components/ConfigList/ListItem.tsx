import withDefaultProps from "@/hocs/withDefaultProps"
import React, { memo, useMemo } from "react"
import styles from "./style.module.scss"
interface IProps {
	data: any[]
	config: Object
}
// 用于 configList 预览的组件
function ListItem(props: IProps) {
  const { data, config } = props
	// config 中选出需要隐藏的数据
	console.log(`ListItemListItemListItemListItemListItemListItemListItem`, props);
	const renderChildren = useMemo(()=>{
		return data.map(item=>{
			// 不知道 item中有哪些数据 
			// 由 config 得到该显示哪些数据
		})
	},[config, data])
	return (
		<div className={styles.item_list_wrap}>
			{data.map((item) => {
				return <div key={item.src}>{item.src}</div>
			})}
		</div>
	)
}

export default memo(
	withDefaultProps(ListItem, { data: [] as any[], config: {} })
)
