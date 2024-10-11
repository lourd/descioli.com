interface ImageProps {
  src: string
  caption?: string
  alt?: string
  linkToOriginal: boolean
  maxWidth?: number
  height: number
  width: number
}

export function Image({
  src,
  caption,
  alt = caption,
  linkToOriginal = true,
  maxWidth,
  height,
  width,
}: ImageProps) {
  let content = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      height={height}
      width={width}
      className="shadow-sm"
    />
  )
  if (linkToOriginal) {
    content = (
      <a href={src} target="_blank" rel="noopener">
        {content}
      </a>
    )
  }
  if (caption) {
    content = (
      <>
        {content}
        <figcaption className="pt-4 text-gray-500 dark:text-gray-300 text-center text-sm leading-tight">
          {caption}
        </figcaption>
      </>
    )
  }
  return (
    <figure
      style={{
        maxWidth,
      }}
      className="flex flex-col items-center mx-auto pt-1 pb-8"
    >
      {content}
    </figure>
  )
}
