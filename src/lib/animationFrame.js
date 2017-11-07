export default function animationFrame() {
  let resolve = null;
  const promise = new Promise(r => (resolve = r));
  window.requestAnimationFrame(resolve);
  return promise;
}
