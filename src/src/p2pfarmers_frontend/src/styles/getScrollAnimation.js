export default function getScrollAnimation() {
	return ({
    offscreen: {
      y: 30,  // Reduced vertical movement
      opacity: 0,
      scale: 0.97,  // Subtle initial scale
    },
    onscreen: ({duration = 0.6, delay = 0} = {}) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",  // Smoother transition
        duration,
        delay,
        ease: "easeOut",  // Smooth easing function
      }
    })
  })
}