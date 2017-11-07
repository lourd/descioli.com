/**
 * 
 * within is a number 0-1 for what percentage from the bottom of the screen the
 * item should be within to be considered within the viewport 
 */
export default function isElementInViewport(el, { within = 0.2 } = {}) {
  const rect = el.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  return (
    (rect.top >= 0 || rect.bottom >= 0) && rect.top < height * (1 - within)
  );
}
