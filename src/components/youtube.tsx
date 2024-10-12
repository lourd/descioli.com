export function YouTube({ videoId }: { videoId: string }) {
  return (
    <div className="pt-2 pb-8">
      <div className="aspect-video shadow-sm">
        <iframe
          src={`//www.youtube.com/embed/${videoId}`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
