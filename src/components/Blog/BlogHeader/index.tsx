import React, { memo, PropsWithChildren } from "react"
import styles from "./style.module.scss"
interface IProps {}
function BlogHeader(props: PropsWithChildren<IProps>) {
	return (
		<div className='flex items-center justify-between'>
			<div>菜单</div>
			<ul>
				<li className='inline-block mr-6'>action1</li>
				<li className='inline-block mr-6'>action2</li>
				<li className='inline-block mr-6'>action3</li>
				<li className='inline-block mr-6'>action4</li>
			</ul>
		</div>
	)
}

export default memo(BlogHeader)
