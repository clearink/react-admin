import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import classNames from "classnames"
import { PepLifeIcon } from "@/components/IconFont"
import styles from "./style.module.scss"
import { Avatar } from "antd"
import SysNotice from "./SysNotice"
import { CommonHeader } from "@/components/PepLife"
import { Link } from "react-router-dom"
import MOCK from "mockjs"
import { UserOutlined } from "@ant-design/icons"
function Home(props: IBaseProps) {
	return (
		<div className={styles["home-page__wrap"]}>
			<CommonHeader icon='icon-chilun' title='管理首页' fixed />
			<main className={styles.content_wrap}>
				<div className={styles.content}>
					<div className='flex mb-8 flex-col lg:flex-row bg-white'>
						<div className={classNames(styles.user_info, "mb-4 lg:mb-0")}>
							<Avatar
								className='flex-shrink-0'
								icon={<UserOutlined />}
								size={70}
								src={"12312321"}
							/>
							<div className={styles.info}>
								<p>{MOCK.Random.cname()}, 欢迎进入XXX康养中心系统</p>
								<p>上次登录: 2020年8月10日 星期三 20:30:23</p>
							</div>
						</div>
						<div className={styles.sys_info}>
							<div className={styles.statistics}>
								<div className={styles.title}>住户数量</div>
								<div className={styles.value}>100</div>
							</div>
							<div className={styles.statistics}>
								<div className={styles.title}>护管数量</div>
								<div className={styles.value}>20</div>
							</div>
							<div className={styles.statistics}>
								<div className={styles.title}>在线设备</div>
								<div className={styles.value}>100</div>
							</div>
						</div>
					</div>
					<div className={styles.module_card}>
						<Link className={styles.card} to='/monitor'>
							<PepLifeIcon type='icon-user' className={styles.icon} />
							<span className={styles.name}>监控分析</span>
						</Link>
						<Link className={styles.card} to='/bedallot'>
							<PepLifeIcon type='icon-user' className={styles.icon} />
							<span className={styles.name}>床位分配</span>
						</Link>
						<Link className={styles.card} to='/resident'>
							<PepLifeIcon type='icon-user' className={styles.icon} />
							<span className={styles.name}>住户管理</span>
						</Link>
						<Link className={styles.card} to='/nurse'>
							<PepLifeIcon type='icon-user' className={styles.icon} />
							<span className={styles.name}>护管管理</span>
						</Link>
						<Link className={styles.card} to='/device'>
							<PepLifeIcon type='icon-user' className={styles.icon} />
							<span className={styles.name}>设备管理</span>
						</Link>
						<div className={styles.card_placeholder}></div>
					</div>
					<SysNotice />
				</div>
			</main>
		</div>
	)
}

export default memo(Home)
