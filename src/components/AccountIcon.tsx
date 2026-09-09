export type AccountIconType = "overview" | "membership" | "profiles" | "arrow" | "card";

export function AccountIcon({ type }: { type: AccountIconType }) {
  const paths: Record<AccountIconType, string> = {
    overview: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
    membership: "M3 5h18v14H3ZM3 9h18M6 15h5",
    profiles: "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM2 21v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3M17 3.2a4 4 0 0 1 0 7.6M22 21v-3a4 4 0 0 0-3-3.87",
    arrow: "m9 5 7 7-7 7",
    card: "M3 5h18v14H3ZM3 9h18M6 15h3M12 15h3",
  };

  return (
    <svg
      className="account-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
}

export default AccountIcon;

