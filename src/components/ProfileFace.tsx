export function ProfileFace({ color, isKids }: { color: string; isKids?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <rect width="160" height="160" rx="5" fill={color} />
      <path d="M0 120c50-25 105 20 160-15v55H0Z" fill="#000" opacity=".08" />
      <circle cx="51" cy="63" r="10" fill="white" />
      <circle cx="113" cy="63" r="10" fill="white" />
      <path d="M45 105c20 20 50 20 72-5" stroke="white" strokeWidth="9" strokeLinecap="round" />
      {isKids && (
        <text x="80" y="148" textAnchor="middle" fill="white" fontSize="21" fontWeight="700" letterSpacing="2">
          kids
        </text>
      )}
    </svg>
  );
}

export default ProfileFace;

