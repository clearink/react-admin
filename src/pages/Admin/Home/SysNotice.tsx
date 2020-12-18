import { PepLifeIcon } from "@/components/IconFont"
import { UserOutlined } from "@ant-design/icons"
import { Button, Card, PageHeader, Space } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import React, { memo, useMemo } from "react"
import styles from "./style.module.scss"

// 系统消息
const dataList = Array.from({ length: 10 }, (_, i) => {
	return {
		key: i,
		title: "【内部分享】新设备上线测试操作说明",
		avatar: "12312",
		name: "李小明",
		time: Date.now(),
	}
})
function SysNotice() {
	return (
		<div className={styles.notice_wrap}>
			<div className={styles.notice_header_wrap}>
				<div className={styles.notice_header}>
					<PepLifeIcon type='icon-notice' className={styles.icon} />
					<span>系统消息</span>
				</div>
				<Space size={10} className={styles.notice_extra}>
					<div className={styles.action}>
						<PepLifeIcon type='icon-plus' />
						发布公告
					</div>
					<div className={styles.action}>
						<PepLifeIcon type='icon-right' />
						查看更多
					</div>
				</Space>
			</div>
			<div className={styles.notice_list}>
				{dataList.map((item) => (
					<div key={item.key} className={styles.list_item}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.poster}>
							<Avatar
								size={30}
								src={item.avatar}
								icon={<UserOutlined className={styles.icon} />}
							/>
							<span className='ml-4'>{item.name}</span>
						</div>
						<div className={styles.time}>
							<PepLifeIcon
								type='icon-shijianzhou-shijian'
								className={styles.icon}
							/>
							<span className='ml-4'>{item.time}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(SysNotice)
