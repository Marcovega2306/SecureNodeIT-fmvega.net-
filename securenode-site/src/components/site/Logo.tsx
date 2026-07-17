// Marca geométrica simple: un "nodo" central con conexiones, en acento rojo.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="SecureNode IT"
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="#101014"
        stroke="#23232c"
        strokeWidth="1.5"
      />
      <path
        d="M16 7v6M16 19v6M7 16h6M19 16h6"
        stroke="#ef2b3d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.4" fill="#ef2b3d" />
      <circle cx="16" cy="7" r="1.6" fill="#5b1116" />
      <circle cx="16" cy="25" r="1.6" fill="#5b1116" />
      <circle cx="7" cy="16" r="1.6" fill="#5b1116" />
      <circle cx="25" cy="16" r="1.6" fill="#5b1116" />
    </svg>
  );
}
