import React, { memo, useMemo } from "react"
import { IBaseProps } from "@/@types/fc"
import classNames from "classnames"
import moment from "moment"
import { PepLifeIcon } from "@/components/IconFont"
import styles from "./style.module.scss"
import { Avatar } from "antd"
import SysNotice from "./SysNotice"
import { CommonHeader } from "@/components/PepLife"
import { Link } from "react-router-dom"
import { UserOutlined } from "@ant-design/icons"
import useTypedSelector from "@/hooks/useTypedSelector"
import useMemoFetch from "@/hooks/useMemoFetch"
function Home(props: IBaseProps) {
	const { user } = useTypedSelector((state) => state.user)
	const [data] = useMemoFetch({
		url: "/orgmgt/index/info",
	})
	const lastLogin = useMemo(() => {
		if (data)
			return moment(data?.result?.lastLoginTime).format(
				"YYYY年MM月DD日 星期E HH:mm:ss"
			)
		return "loading..."
	}, [data])
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
								src={user?.avatar}
							/>
							<div className={styles.info}>
								<p>{user?.username} 欢迎进入云达康智慧养老看护系统</p>
								<p>上次登录: {lastLogin}</p>
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
