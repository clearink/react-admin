import React from "react"
import { Upload } from "antd"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"
import { UploadProps } from "antd/lib/upload"
import { UploadOutlined } from "@ant-design/icons"

export interface ProFormAvatarProps extends UploadProps {
	render?: BaseProFieldProps<ProFormAvatarProps>["render"]
	value?: UploadProps["fileList"]
}
// 该组件只用于 上传头像
function ProFormAvatar(props: ProFormAvatarProps) {
	const { render, value, ...rest } = props
	const DOM = (
		<Upload fileList={value} {...rest}>
			<UploadOutlined />
		</Upload>
	)
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormAvatarProps>(ProFormAvatar, {
	// 可在此设置   headers
	value: [],
})
/** 
tion UploadWithPreView(props, ref) {
	const {
		value = [],
		onChange = () => {},
		limit = Infinity,
		children,
		avatarStyle,
		...rest
	} = props
	const [visible, toggle] = useBoolean() // modal
	const [loading, setLoading] = useState(false) // loading

	const [src, setSrc] = useState(() => {
		if (limit === 1) return value[0]?.url
		return null
	})

	// 初始化图片
	useEffect(() => {
		setSrc(value?.[0]?.url)
	}, [value])

	const handlePreview = (file) => {
		if (file?.url) setSrc(file.url)
		toggle()
	}

	// 上传失败 从列表移除
	const handleUploadError = useCallback(
		(args) => {
			const { file, fileList } = args
			setLoading(false)
			message.error(`${file.name}上传失败`)
			if (limit === 1) setSrc(null) // 清空 图片
			onChange(fileList.filter((item) => item.uid !== file.uid)) // 失败删除当前文件
		},
		[onChange, limit]
	)

	const handleOnChange = useCallback(
		(args) => {
			const { file, fileList } = args
			if (file.status === "uploading") {
				setLoading(true)
			}

			if (file.status === "error") {
				handleUploadError(args)
				return
			}

			if (file.status === "done") {
				const { response } = file

				if (!response.success) {
					handleUploadError(args)
					return
				}

				setLoading(false)
				message.success("上传成功")

				if (limit === 1) setSrc(response?.result?.url)
			}
			if (!file.status) return
			onChange(
				fileList
					.map((item) => {
						const { response: res } = item
						if (!res) return item
						return {
							uid: item.uid,
							name: item.name,
							fkey: res?.result?.fkey,
							url: res?.result?.url,
						}
					})
					.slice(-limit) // 限制数量
			)
		},
		[limit, onChange, handleUploadError]
	)

	// 处理 达到 limit 或者 limit===1 时的逻辑
	let uploadButton = null
	if (limit === 1 && loading) {
		uploadButton = <Icon type='loading' />
	} else if (limit === 1 && src) {
		uploadButton = <img src={src} style={avatarStyle} alt='preview-img' />
	} else if (limit >= value.length) {
		uploadButton = children
	}

	const UploadComponent = (
		<Upload
			onChange={handleOnChange}
			onPreview={handlePreview}
			fileList={value}
			showUploadList={limit !== 1}
			action={actionUrl}
			headers={uploadHeaders()}
			multiple={limit > 1}
			// transformFile={file => {
			//   console.log(file)
			//   file.name = file.name.toLowerCase()
			//   return file;
			// }}
			{...rest}
		>
			{uploadButton}
		</Upload>
	)

	return (
		<div className='upload-with-preview' style={{ width: "100%" }}>
			{cut ? (
				<ImgCrop
					grid
					quality={0.9}
					aspect={aspect}
					minZoom={0.3}
					maxZoom={5}
					cropperProps={{ restrictPosition: true }}
				>
					{UploadComponent}
				</ImgCrop>
			) : (
				UploadComponent
			)}
			<Modal visible={visible} onCancel={toggle} footer={null}>
				<img src={src} style={{ width: "100%" }} alt='preview-img' />
			</Modal>
		</div>
	)
}
 
*/
