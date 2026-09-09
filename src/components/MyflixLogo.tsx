export default function MyflixLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`myflix-wordmark ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 194 56"
      role="img"
      aria-label="MYFLIX"
    >
      <g fill="#e50914">
        <path d="M2 54V2h10l9 24 9-24h10v47l-10 1V25l-9 23-9-23v28Z" />
        <path d="M44 2h11l7 19 7-19h11L67 33v14l-10 1V33Z" />
        <path d="M83 47V2h26v10H93v9h14v10H93v16Z" />
        <path d="M113 2h10v36l16 2v10l-26-2Z" />
        <path d="M143 2h10v49l-10-1Z" />
        <path d="M157 2h10l7 15 7-15h10l-12 25 13 29-12-2-6-17-7 16-11-1 12-25Z" />
      </g>
    </svg>
  );
}

