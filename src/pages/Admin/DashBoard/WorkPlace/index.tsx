import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import "./style.scss"
import { Typography, Form, Input } from "antd"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import ProFormText from "@/components/Pro/ProForm/components/ProFormText"
import { MobileTwoTone } from "@ant-design/icons"

function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap'>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<Typography.Title level={4}>pro form</Typography.Title>
			<BaseForm
				style={{ width: 340, margin: "0 auto" }}
				submitConfig={{
					submitButtonProps: {
						text: "登录",
						block: true,
						size: "large",
					},
					render: (_, dom) => dom.pop(),
				}}
			>
				<h1
					style={{
						textAlign: "center",
					}}
				>
					<img
						style={{
							height: "44px",
							marginRight: 16,
						}}
						alt='logo'
						src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
					/>
					Ant Design
				</h1>
				<div
					style={{
						marginTop: 12,
						textAlign: "center",
						marginBottom: 40,
					}}
				>
					Ant Design 是西湖区最具影响力的 Web 设计规范
				</div>
				<ProFormText
					fieldProps={{
						size: "large",
						prefix: <MobileTwoTone />,
					}}
					name='id'
					placeholder='请输入手机号'
					rules={[
						{
							required: true,
							message: "请输入手机号!",
						},
						{
							pattern: /^1\d{10}$/,
							message: "不合法的手机号格式!",
						},
					]}
				/>
			</BaseForm>
		</div>
	)
}

export default WorkPlace

/**
 * <Divider />
			<ProField
				text='0.3'
				field={{ type: "percent", style: { width: 400 } }}
				mode={mode}
			/>
			<Divider />
			<ProField
				text='-0.3'
				field={{
					type: "percent",
					hasColor: true,
				}}
				mode={mode}
			/>
			<Divider />
			<ProField text='19897979797979' field='number' mode={mode} />
			<Divider />
			<ProField text={2000000} field='second' mode={mode} />
			<Divider />
			<ProField text={2.5} field='rate' mode={mode} />
 */
