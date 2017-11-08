let lastPosition = -1;
let lastWidth = -1;
let lastHeight = -1;
let oldTime = -1;
let newTime = -2;
let moved = true;

export default function windowMoved(timestamp) {
  // If on the same frame as the last call, skip updating and return same result
  if (newTime !== oldTime) {
    moved =
      lastPosition !== window.pageYOffset ||
      lastWidth !== window.innerWidth ||
      lastHeight !== window.innerHeight;
    lastPosition = window.pageYOffset;
    lastWidth = window.innerWidth;
    lastHeight = window.innerHeight;
    oldTime = newTime;
  }
  return moved;
}
