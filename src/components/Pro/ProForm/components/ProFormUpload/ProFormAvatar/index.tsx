import React from "react"
import { Upload } from "antd"
import classNames from "classnames"
import { FrownOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import styles from "./style.module.scss"
import { ProFormAvatarProps } from "../interface"
import useUploadAvatarService from "./useUploadAvatar.service"

// 该组件只用于 上传头像
function ProFormAvatar(props: ProFormAvatarProps) {
	const {
		onChange,
		transform,
		value,
		beforeUpload,
		limit,
		shape,
		size,
		render,
		...rest
	} = props
	/**
	 * 	"onChange" | "transform" | "value" | "beforeUpload" | "limit"
	 */
	const uploadAvatarService = useUploadAvatarService(props)

	// 根据条件渲染不同的uploadButton
	const uploadButton = (() => {
		// 如果loading = true
		const { loading, error } = uploadAvatarService.state

		if (loading) {
			return (
				<>
					<LoadingOutlined className={styles.icon} />
					<span className={styles.text}>上传</span>
				</>
			)
		}

		// 图片加载失败
		if (error) {
			return (
				<>
					<FrownOutlined className={styles.error_icon} />
					<span className={classNames(styles.error_text)}>加载失败</span>
				</>
			)
		}
		// 没有 value 认定为没有上传
		if (!value) {
			return (
				<>
					<PlusOutlined className={styles.icon} />
					<span className={styles.text}>上传</span>
				</>
			)
		}

		return (
			<img
				className={styles.img}
				src={value}
				alt={value}
				onError={() => uploadAvatarService.methods.setError(true)} // 加载失败
				onLoad={() => uploadAvatarService.methods.setError(false)} // 加载成功
			/>
		)
	})()

	const isCircle = shape === "circle"
	const DOM = (
		<Upload
			accept='image/*'
			{...rest}
			beforeUpload={uploadAvatarService.handleBeforeUpload}
			onChange={uploadAvatarService.handleUploadChange}
			showUploadList={false}
		>
			<div
				style={{
					width: size,
					height: size,
				}}
				className={classNames({ [styles.circle]: isCircle }, styles.avatar)}
			>
				{uploadButton}
			</div>
		</Upload>
	)
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormAvatarProps>(ProFormAvatar, {
	// 可在此设置   headers
	value: "",
	size: 100,
	shape: "rect",
})
