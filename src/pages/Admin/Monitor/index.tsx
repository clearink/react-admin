import React from "react"
import styles from "./style.module.scss"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined } from "@ant-design/icons"
import { Button, Card, Radio, Space, Tabs } from "antd"
// 监控分析
function Monitor() {
	return (
		<main className={styles.content_wrap}>
			{/* 楼层 */}
			<div className={styles.filter_bar}>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>楼层</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 6 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i}楼
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>房间</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 36 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i + 500}
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>状态</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 6 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i + 500}
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
			</div>
			{/* 病床 */}
			<div className={styles.bed_card_list}>
				{Array.from({ length: 40 }, (_, i) => (
					<Card
						className={styles.bed_card}
						key={i}
						title='501房 - 01床'
						style={{ width: 200 }}
						actions={[
							<Button key='bcg' type='link' size='small'>
								心率呼吸BCG
							</Button>,
							<Button key='record' type='link' size='small'>
								睡眠报告
							</Button>,
						]}
					>
						<div className={styles.bed_info}>
							<div>在床</div>
							<div>name</div>
							<div>告警</div>
						</div>
					</Card>
				))}
			</div>
		</main>
	)
}

export default Monitor
