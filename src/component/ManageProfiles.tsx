import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import MyflixLogo from "./MyflixLogo";
import { activeProfileStorageKey, profilesStorageKey, readProfiles, type Profile } from "../data/profiles";

const avatarColors = [
  { name: "Teal", value: "#147d92" },
  { name: "Blue", value: "#2457a7" },
  { name: "Red", value: "#b81d24" },
  { name: "Purple", value: "#6f4e9c" },
  { name: "Green", value: "#2e7d32" },
  { name: "Gold", value: "#e5a00d" },
];

function PencilIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l1-5L16 4a2.8 2.8 0 0 1 4 4L9 19l-5 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ProfileFace({ color, isKids }: { color: string; isKids?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <rect width="160" height="160" rx="5" fill={color} />
      <path d="M0 120c50-25 105 20 160-15v55H0Z" fill="#000" opacity=".08" />
      <circle cx="51" cy="63" r="10" fill="white" />
      <circle cx="113" cy="63" r="10" fill="white" />
      <path d="M45 105c20 20 50 20 72-5" stroke="white" strokeWidth="9" strokeLinecap="round" />
      {isKids && <text x="80" y="148" textAnchor="middle" fill="white" fontSize="21" fontWeight="700" letterSpacing="2">kids</text>}
    </svg>
  );
}

export default function ManageProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>(readProfiles);
  const [params, setParams] = useSearchParams();
  const managing = params.get("mode") !== "select";
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Profile | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [choosingIcon, setChoosingIcon] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lastProfileButton = useRef<HTMLButtonElement | null>(null);
  const canDelete = draft && !isAdding && draft.id !== profiles[0]?.id;

  useEffect(() => {
    if (!draft || confirmDelete) headingRef.current?.focus();
  }, [managing, draft?.id, confirmDelete]);

  const closeEditor = () => {
    setDraft(null);
    setError("");
    setChoosingIcon(false);
    setConfirmDelete(false);
    requestAnimationFrame(() => {
      if (lastProfileButton.current?.isConnected) lastProfileButton.current.focus();
    });
  };

  const saveProfiles = (nextProfiles: Profile[]) => {
    try {
      localStorage.setItem(profilesStorageKey, JSON.stringify(nextProfiles));
      setProfiles(nextProfiles);
      closeEditor();
    } catch {
      setError("Your changes couldn't be saved. Allow browser storage and try again.");
    }
  };

  const switchProfile = (profile: Profile) => {
    try {
      localStorage.setItem(activeProfileStorageKey, profile.id);
      navigate("/");
    } catch {
      setError("Couldn't switch profiles. Allow browser storage and try again.");
    }
  };

  const openEditor = (profile: Profile, button: HTMLButtonElement, adding = false) => {
    lastProfileButton.current = button;
    setIsAdding(adding);
    setChoosingIcon(false);
    setConfirmDelete(false);
    setError("");
    setDraft({ ...profile });
  };

  return (
    <main className="profiles-page">
      <Link className="profiles-logo" to="/" aria-label="MYFLIX home"><MyflixLogo /></Link>
      {!draft ? (
        <section className="profiles-panel" aria-labelledby="profiles-heading">
          <h1 id="profiles-heading" ref={headingRef} tabIndex={-1}>{managing ? "Manage Profiles:" : "Who's watching?"}</h1>
          {error && <p className="profiles-error" role="alert">{error}</p>}
          <div className="profiles-grid">
            {profiles.map((profile) => (
              <button className="profile-card" type="button" key={profile.id}
                aria-label={`${managing ? "Edit" : "Watch as"} ${profile.name}`}
                onClick={(event) => managing ? openEditor(profile, event.currentTarget) : switchProfile(profile)}>
                <span className="profile-card__avatar">
                  <ProfileFace color={profile.color} isKids={profile.isKids} />
                  {managing && <span className="profile-card__edit"><PencilIcon /></span>}
                </span>
                <span className="profile-card__name">{profile.name}</span>
              </button>
            ))}
            {profiles.length < 5 && (
              <button className="profile-card profile-card--add" type="button" onClick={(event) => openEditor({
                id: crypto.randomUUID(), name: "", color: avatarColors[profiles.length % avatarColors.length]!.value,
              }, event.currentTarget, true)}>
                <span className="profile-card__avatar"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="33" fill="currentColor" /><path d="M50 30v40M30 50h40" stroke="#141414" strokeWidth="5" /></svg></span>
                <span className="profile-card__name">Add Profile</span>
              </button>
            )}
          </div>
          <button className={`profiles-mode-button profile-button${managing ? " profile-button--primary" : ""}`} type="button"
            onClick={() => { setError(""); setParams(managing ? { mode: "select" } : {}); }}>
            {managing ? "Done" : "Manage Profiles"}
          </button>
        </section>
      ) : (
        <section className="profile-editor" aria-labelledby="edit-profile-title">
          <h1 id="edit-profile-title" ref={headingRef} tabIndex={-1}>{confirmDelete ? "Delete Profile?" : isAdding ? "Add Profile" : "Edit Profile"}</h1>
          {isAdding && <p className="profile-editor__intro">Add a profile for another person watching Myflix.</p>}
          {error && <p className="profiles-error" role="alert">{error}</p>}
          {confirmDelete ? (
            <div>
              <div className="profile-editor__body">
                <div className="profile-editor__identity"><ProfileFace color={draft.color} isKids={draft.isKids} /><span>{draft.name}</span></div>
                <p className="profile-editor__delete-message">Are you sure you want to delete {draft.name}'s profile? This can't be undone.</p>
              </div>
              <div className="profile-editor__actions">
                <button className="profile-button profile-button--primary" type="button" onClick={() => setConfirmDelete(false)}>Keep Profile</button>
                <button className="profile-button" type="button" onClick={() => {
                  if (canDelete) saveProfiles(profiles.filter((profile) => profile.id !== draft.id));
                }}>Delete Profile</button>
              </div>
            </div>
          ) : (
            <form onSubmit={(event) => {
              event.preventDefault();
              const name = draft.name.trim();
              if (!name) { setError("Please enter a profile name."); return; }
              if (isAdding && profiles.length >= 5) { setError("You can have up to 5 profiles."); return; }
              const saved = { ...draft, name };
              saveProfiles(isAdding ? [...profiles, saved] : profiles.map((profile) => profile.id === draft.id ? saved : profile));
            }} onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                if (choosingIcon) setChoosingIcon(false); else closeEditor();
              }
            }}>
              <div className="profile-editor__body">
                <button className="profile-editor__avatar" type="button" aria-label="Change profile icon" aria-expanded={choosingIcon} aria-controls={choosingIcon ? "profile-icons" : undefined} onClick={() => setChoosingIcon(!choosingIcon)}>
                  <ProfileFace color={draft.color} isKids={draft.isKids} />
                  <span className="profile-editor__pencil"><PencilIcon /></span>
                </button>
                <div className="profile-editor__fields">
                  <label className="profile-editor__name-label" htmlFor="profile-name">Profile name</label>
                  <input id="profile-name" name="name" value={draft.name} placeholder="Name" maxLength={24} required autoFocus
                    onChange={(event) => { setDraft({ ...draft, name: event.target.value }); setError(""); }} />
                  {choosingIcon && <fieldset className="profile-icons" id="profile-icons">
                    <legend>Choose your icon</legend>
                    <div className="profile-icons__grid">
                      {avatarColors.map((color) => <label className="profile-icons__option" key={color.value}>
                        <input type="radio" name="avatar" value={color.value} checked={draft.color === color.value} onChange={() => setDraft({ ...draft, color: color.value })} aria-label={color.name} />
                        <span><ProfileFace color={color.value} /></span>
                      </label>)}
                    </div>
                  </fieldset>}
                  {!choosingIcon && <button className="profile-editor__change-icon" type="button" onClick={() => setChoosingIcon(true)}>Change profile icon</button>}
                </div>
              </div>
              <div className="profile-editor__actions">
                <button className="profile-button profile-button--primary" type="submit">{isAdding ? "Continue" : "Save"}</button>
                <button className="profile-button" type="button" onClick={closeEditor}>Cancel</button>
                {canDelete && <button className="profile-button" type="button" onClick={() => setConfirmDelete(true)}>Delete Profile</button>}
              </div>
            </form>
          )}
        </section>
      )}
    </main>
  );
}
