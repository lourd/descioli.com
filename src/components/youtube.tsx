export function YouTube({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video mb-6 shadow-sm">
      <iframe
        src={`//www.youtube.com/embed/${videoId}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}
