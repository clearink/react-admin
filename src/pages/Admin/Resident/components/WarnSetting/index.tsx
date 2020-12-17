import React from "react"
import {
	Button,
	Card,
	DatePicker,
	Form,
	InputNumber,
	Space,
	Switch,
} from "antd"
import styles from "./style.module.scss"

// 预警信息
function WarnSetting() {
	return (
		<div >
			<Card
				bordered={false}
				size='small'
				title='护理提醒(分钟)'
				extra={<Switch checkedChildren='启用' unCheckedChildren='禁用' />}
			>
				<Form layout='vertical' className='flex flex-col md:flex-row flex-wrap'>
					<Form.Item
						label='护理提醒时长 :'
						name='duration'
						className='w-5/12'
						rules={[
							{
								required: true,
								message: "请输入护理提醒时长,最长持续时长5小时",
							},
						]}
					>
						<InputNumber
							min={0}
							max={300}
							placeholder='护理提醒时长'
							className='w-3/4'
						/>
					</Form.Item>
					<Form.Item
						name='time'
						label='护理时间段 :'
						rules={[
							{
								required: true,
								message: "请输入护理提醒的起止时间段",
							},
						]}
						className='w-5/12'
					>
						<DatePicker.RangePicker picker='time' />
					</Form.Item>
					<span className={styles.tips}>
						tips: 起止时间点一样说明24小时内都需要护理，
						例："00:00-00:00",护理间隔为10分钟，说明24小时内,
						每10分钟推送一次护理提醒
					</span>
				</Form>
			</Card>
			<Card
				bordered={false}
				size='small'
				title='离床提醒(分钟)'
				extra={<Switch checkedChildren='启用' unCheckedChildren='禁用' />}
			>
				<Form layout='vertical' className='flex flex-col md:flex-row flex-wrap'>
					<Form.Item
						label='离床持续时长 :'
						name='duration'
						className='w-5/12'
						rules={[
							{
								required: true,
								message: "请输入离床持续时长,最长持续时长5小时",
							},
						]}
					>
						<InputNumber
							min={0}
							max={300}
							placeholder='离床持续时长'
							className='w-3/4'
						/>
					</Form.Item>
					<Form.Item
						name='time'
						label='告警时间段 :'
						rules={[
							{
								required: true,
								message: "请输入离床提醒的起止时间段",
							},
						]}
						className='w-5/12'
					>
						<DatePicker.RangePicker picker='time' />
					</Form.Item>
					<span className={styles.tips}>
						tips: 起止时间点一样说明24小时内都需要护理，
						例："00:00-00:00",护理间隔为10分钟，说明24小时内,
						每10分钟推送一次离床预警
					</span>
				</Form>
			</Card>
			<Card
				bordered={false}
				size='small'
				title='心率异常(次/分)'
				extra={<Switch checkedChildren='启用' unCheckedChildren='禁用' />}
			>
				<Form layout='vertical' className='flex flex-col md:flex-row flex-wrap'>
					<Form.Item
						label='告警上/下限 :'
						name='duration'
						className='w-full'
						rules={[
							{
								required: true,
								message: "请正确配置心率告警的上/下限",
							},
						]}
					>
						<InputNumber
							min={0}
							max={300}
							placeholder='护理提醒时长'
							className='w-full'
						/>
					</Form.Item>
					<span className={styles.tips}>
						tips:
						设备采集到的心率数据,超过设定的上限或者低于设定的下限,推送一条心率预警
					</span>
				</Form>
			</Card>
			<Card
				bordered={false}
				size='small'
				title='呼吸率异常(次/分)'
				extra={<Switch checkedChildren='启用' unCheckedChildren='禁用' />}
			>
				<Form layout='vertical' className='flex flex-col md:flex-row flex-wrap'>
					<Form.Item
						label='告警上/下限 :'
						name='duration'
						className='w-full'
						rules={[
							{
								required: true,
								message: "请正确配置呼吸率告警的上/下限",
							},
						]}
					>
						<InputNumber
							min={0}
							placeholder='护理提醒时长'
							className='w-full'
						/>
					</Form.Item>
					<span className={styles.tips}>
						tips:
						设备采集到的呼吸数据,超过设定的上限或者低于设定的下限,推送一条呼吸预警
					</span>
				</Form>
			</Card>
			<Card
				bordered={false}
				size='small'
				title='体动频繁(分钟)'
				extra={<Switch checkedChildren='启用' unCheckedChildren='禁用' />}
			>
				<Form layout='vertical' className='flex flex-col md:flex-row flex-wrap'>
					<Form.Item
						label='告警时长 :'
						name='duration'
						className='w-5/12'
						rules={[
							{
								required: true,
								message: "请输入体动频繁持续的时长,最长持续时长5小时",
							},
						]}
					>
						<InputNumber
							className='w-3/4'
							min={0}
							placeholder='体动频繁持续时长'
						/>
					</Form.Item>
					<Form.Item
						label='告警时间段 :'
						name='duration'
						className='w-5/12'
						rules={[
							{
								required: true,
								message: "请输入体动频繁告警时间段",
							},
						]}
					>
						<DatePicker.RangePicker className='w-3/4' />
					</Form.Item>
					<span className={styles.tips}>
						tips: 起止时间点一样说明24小时内都需要报警，
						例："00:00-00:00",体动频繁持续时长为为10分钟，说明24小时内,
						每10分钟推送体动频繁预警
					</span>
				</Form>
			</Card>
		</div>
	)
}

export default WarnSetting
