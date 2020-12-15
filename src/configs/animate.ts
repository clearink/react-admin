import { AnimationProps } from "framer-motion"

// framer-motion 动画配置
export const animateProps = {
	initial: "initial",
	animate: "animate",
	exit: "exit",
}

export const homeImageVariants = {
	initial: (direction: number) => {
		return {
			opacity: 0,
			x: direction > 0 ? "100%" : "-100%",
			scale: 0.8,
		}
	},

	animate: {
		zIndex: 1,
		opacity: 1,
		x: 0,
		scale: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			opacity: 0,
			x: direction > 0 ? "-100%" : " 100%",
			scale: 0.8,
		}
	},
}

export const errorVariants = {
	initial: { y: "-50%", opacity: 0 },
	animate: { y: "0", opacity: 1 },
	exit: { y: "-50%", opacity: 0 },
}

export const pageAnimate: AnimationProps["variants"] = {
	initial: {
		opacity: 0,
		x: "-100%",
		position: "absolute",
		transition: { type: "tween", duration: 0.3 },
	},

	animate: {
		zIndex: 1,
		opacity: 1,
		x: 0,
		position: "inherit",
		transition: { type: "tween", duration: 0.3 },
	},
	exit: {
		zIndex: 0,
		opacity: 0,
		x:"100%",
		transition: { type: "tween", duration: 0.3 },
		position: "absolute",
	},
}
