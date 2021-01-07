import React, { createElement, useMemo, useState } from "react"
import { Upload, Image } from "antd"
import classNames from "classnames"
import { UploadProps } from "antd/lib/upload"
import { FrownOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import styles from "./style.module.scss"
import useMethods from "@/components/Pro/hooks/methods/useMethods"

export interface ProFormAvatarProps extends UploadProps {
	render?: BaseProFieldProps<ProFormAvatarProps>["render"]
	/** 转换上传后的数据 */
	transform?: (response: any) => string
	value?: string
	/** 显示订的形状 */
	shape?: "rect" | "circle"
	/** 头像大小 */
	size?: number | string
}
const initialState = {
	loading: false,
	error: null,
}
const reducers = {
	setLoading(state: any, loading: boolean) {
		return { ...state, loading }
	},
	setError(state: any, error: boolean) {
		return { ...state, error }
	},
}
// 该组件只用于 上传头像
function ProFormAvatar(props: ProFormAvatarProps) {
	const { render, value, onChange, shape, size, transform, ...rest } = props
	const [state, methods] = useMethods(reducers, initialState)

	// 处理 头像src 与 loading
	const handleUploadChange: UploadProps["onChange"] = (info) => {
		const { file } = info
		if (file.status === "uploading") {
			methods.setLoading(true)
		}
		if (file.status === "done") {
			const result = transform?.(file.response) ?? file.response
			onChange?.(result)
			methods.setLoading(false)
		}
		if (file.status === "error") methods.setLoading(false)
	}
	const isCircle = shape === "circle"
	const uploadButton = (() => {
		// 没有 value 认定为没有上传
		if (!value) {
			return (
				<>
					{createElement(state.loading ? LoadingOutlined : PlusOutlined, {
						className: styles.icon,
					})}
					<span className={styles.text}>上传</span>
				</>
			)
		}
		// 图片加载失败
		if (state.error) {
			return (
				<>
					<FrownOutlined className={styles.error_icon} />
					<span className={classNames(styles.error_text)}>加载失败</span>
				</>
			)
		}
		return (
			<img
				className={styles.img}
				src={value}
				alt={value}
				// 加载失败
				onError={() => methods.setError(true)}
				// 加载成功
				onLoad={() => methods.setError(false)}
			/>
		)
	})()

	const DOM = (
		<Upload onChange={handleUploadChange} showUploadList={false} {...rest}>
			<div
				style={{ width: size, height: size }}
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
