type Props = {
  className?: string
}

export function WakeLine({ className }: Props) {
  return (
    <svg
      className={className ? `wake ${className}` : "wake"}
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 24 C 120 8, 180 40, 300 24 S 480 8, 600 24 780 40, 900 24 1080 8, 1200 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}
