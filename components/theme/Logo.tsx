export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top leaf */}
      <path d="M12 4C10 2 7 2 5 4S2 9 4 11C6 13 9 13 11 11" />

      {/* Right leaf */}
      <path d="M20 12C22 10 22 7 20 5S15 2 13 4C11 6 11 9 13 11" />

      {/* Bottom leaf */}
      <path d="M12 20C14 22 17 22 19 20S22 15 20 13C18 11 15 11 13 13" />

      {/* Left leaf */}
      <path d="M4 12C2 14 2 17 4 19S9 22 11 20C13 18 13 15 11 13" />

      {/* Stem */}
      <path d="M12 11V22" />
    </svg>
  );
}
