/*
 * @Description:
 * @Author: clearink
 * @Date: 2020-09-27 09:30:50
 * @LastEditors: clearink
 * @LastEditTime: 2020-10-20 11:58:00
 */
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
