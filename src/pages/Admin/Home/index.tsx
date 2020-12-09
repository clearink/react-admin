import React, { memo, useReducer } from "react"
import { IBaseProps } from "@/@types/fc"
import { Button, Space } from "antd"
import chat from "@/assets/svg/chat.svg"
import file from "@/assets/svg/file.svg"
import image from "@/assets/svg/image.svg"
import interact from "@/assets/svg/interact.svg"
import propaganda from "@/assets/svg/propaganda.svg"
import success from "@/assets/svg/success.svg"
import { motion as m, AnimatePresence } from "framer-motion"
import { animateProps, homeImageVariants } from "@/configs/animate"
import useInterval from "@/hooks/useInterval"
import { bindActionCreators, createSlice, Dispatch } from "@reduxjs/toolkit"
import "./style.scss"

const init = {
	current: 0,
	direction: 1,
	images: [chat, file, image, interact, propaganda, success],
	loading: false,
}
const slice = createSlice({
	name: "banner",
	initialState: init,
	reducers: {
		next(state) {
			state.current = (state.current + 1) % state.images.length
			state.direction = 1
			state.loading = true
		},
		prev(state) {
			state.loading = true
			state.direction = -1
			state.current =
				(state.current - 1 + state.images.length) % state.images.length
		},
		complete(state) {
			state.loading = false
		},
	},
})

function Home(props: IBaseProps) {
	const [{ current, images, direction }, dispatch] = useReducer(
		slice.reducer,
		init
	)
	const actions = bindActionCreators(slice.actions, dispatch as Dispatch)
	const [clear, reload] = useInterval(() => {
		actions.next()
	}, 2000)

	const handlePrev = () => {
		actions.prev()
		reload()
	}

	const handleNext = () => {
		actions.next()
		reload()
	}

	return (
		<div className='home-page__wrap'>
			<div className='image-list__wrap rounded-md'>
				<AnimatePresence
					initial={false}
					custom={direction}
					onExitComplete={() => dispatch(actions.complete)}
				>
					<m.img
						className='image-item bg-gray-300 rounded-md'
						key={current}
						onHoverStart={clear}
						onHoverEnd={reload}
						src={images[current]}
						transition={{
							type: "tween",
							duration: 0.3,
						}}
						alt='svg'
						custom={direction}
						{...animateProps}
						variants={homeImageVariants}
					/>
				</AnimatePresence>
			</div>
			<Space>
				<Button onClick={handlePrev}>prev</Button>
				<Button onClick={handleNext}>next</Button>
			</Space>
		</div>
	)
}

export default memo(Home)
