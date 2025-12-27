import { motion, Transition, Variants } from "motion/react"
import { CSSProperties } from "react"

type HamburgerIconProps = {
  isOpen: boolean
}

const BAR_GAP = 8
const LENGTH = 24
const THICKNESS = 3
const topY = -BAR_GAP
const bottomY = BAR_GAP

// Trigonometry, yo.
const sqrt2over4 = 0.354
const deltaX = LENGTH * (0.5 - sqrt2over4)
const deltaY = BAR_GAP - sqrt2over4 * LENGTH

const bar1Variants: Variants = {
  open: {
    x: deltaX,
    y: topY + deltaY,
    rotate: "45deg",
  },
  closed: {
    x: 0,
    y: topY,
    rotate: 0,
  },
}

const bar2Variants = {
  open: {
    opacity: 0,
  },
  closed: {
    opacity: 1,
  },
}

const bar3Variants = {
  open: {
    x: -deltaX,
    y: -bottomY + deltaY,
    rotate: "-45deg",
  },
  closed: {
    x: 0,
    y: bottomY,
    rotate: 0,
  },
}

const transition: Transition = {
  type: "spring",
}

const BAR_CLASSES =
  "absolute w-(--bar-length) bg-white h-(--bar-thickness) rounded-md"

export function HamburgerIcon(props: HamburgerIconProps) {
  return (
    <motion.span
      initial={false}
      animate={props.isOpen ? "open" : "closed"}
      className="relative w-full h-full flex items-center justify-center"
      style={
        {
          "--bar-gap": `${BAR_GAP}px`,
          "--bar-length": `${LENGTH}px`,
          "--bar-thickness": `${THICKNESS}px`,
        } as CSSProperties
      }
    >
      <motion.span
        className={`${BAR_CLASSES} origin-top-left`}
        variants={bar1Variants}
        transition={transition}
      />
      <motion.span
        className={BAR_CLASSES}
        variants={bar2Variants}
        transition={transition}
      />
      <motion.span
        className={`${BAR_CLASSES} origin-bottom-right`}
        variants={bar3Variants}
        transition={transition}
      />
    </motion.span>
  )
}
