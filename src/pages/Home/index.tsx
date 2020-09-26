import React, { memo, useReducer, useState } from "react"
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

const init = {
	current: 0,
	images: [chat, file, image, interact, propaganda, success],
	loading: false,
}

const imageReducer = (state: typeof init, action: any) => {
	const { type } = action
	switch (type) {
		case "NEXT":
			return {
				...state,
				current: (state.current + 1) % state.images.length,
				loading: true,
			}
		case "PREV":
			return {
				...state,
				current:
					(state.current - 1 + state.images.length) % state.images.length,
				loading: true,
			}
		case "COMPLETE":
			return {
				...state,
				loading: false,
			}
		default:
			return state
	}
}
function Home(props: IBaseProps) {
	const [{ current, images, loading }, dispatch] = useReducer(
		imageReducer,
		init
	)
	const [direction, setDirection] = useState(1)
	const [clear, reload] = useInterval(() => {
		setDirection(1)
		dispatch({ type: "NEXT" })
	}, 2000)

	const handlePrev = () => {
		setDirection(-1)
		dispatch({ type: "PREV" })
		reload()
	}

	const handleNext = () => {
		setDirection(1)
		dispatch({ type: "NEXT" })
		reload()
	}

	return (
		<div className='home-page__wrap'>
			<div className='image-list__wrap rounded-md'>
				<AnimatePresence
					initial={false}
					custom={direction}
					onExitComplete={() => dispatch({ type: "COMPLETE" })}
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
