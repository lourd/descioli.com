export default function HomeTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="motion-safe:animate-fadeIn w-full h-full">{children}</div>
  )
}
