type VideoProps = {
  src: string
  caption?: string
  maxWidth: number
}
export function Video({ src, caption, maxWidth }: VideoProps) {
  return (
    <figure style={{ maxWidth: `${maxWidth}px` }} className="mx-auto pt-1 pb-8">
      <video src={src} controls width="100%" className="shadow-sm" />
      {caption && (
        <figcaption className="pt-4 text-gray-500 dark:text-gray-300 text-center text-sm leading-tight">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
