export type Profile = {
  id: string;
  name: string;
  color: string;
  isKids?: boolean;
};

export const defaultProfiles: Profile[] = [
  { id: "danar", name: "Danar", color: "#147d92" },
  { id: "kids", name: "Kids", color: "#e5a00d", isKids: true },
];

export const profilesStorageKey = "myflix-profiles";
export const activeProfileStorageKey = "myflix-active-profile";

export function readProfiles(): Profile[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(profilesStorageKey) ?? "null");
    if (Array.isArray(saved) && saved.length && saved.every((profile) =>
      profile && typeof profile.id === "string" && typeof profile.name === "string" && typeof profile.color === "string"
    )) return saved;
  } catch { /* Use defaults when storage is unavailable or invalid. */ }
  return defaultProfiles;
}

export function readActiveProfile(profiles = readProfiles()): Profile {
  try {
    return profiles.find((profile) => profile.id === localStorage.getItem(activeProfileStorageKey)) ?? profiles[0]!;
  } catch {
    return profiles[0]!;
  }
}
