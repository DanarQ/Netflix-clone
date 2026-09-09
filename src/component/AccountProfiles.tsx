import { useState } from "react";
import { Link, useParams } from "react-router";
import { AccountIcon } from "./Account";
import { ProfileFace } from "./ManageProfiles";
import { readActiveProfile, readProfiles, profilesStorageKey } from "../data/profiles";

export default function AccountProfiles() {
  const { profileId } = useParams();
  const [profiles, setProfiles] = useState(readProfiles);
  const activeProfile = readActiveProfile(profiles);
  const profile = profiles.find((item) => item.id === profileId);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  if (profileId && !profile) return <><div className="account-title"><h1>Profile not found</h1></div><Link className="account-button" to="/account/profiles">Back to Profiles</Link></>;
  if (profile) return <>
    <Link className="account-back" to="/account/profiles">← Profiles</Link>
    <div className="account-title account-profile-title"><span className="account-profile__avatar"><ProfileFace color={profile.color} isKids={profile.isKids} /></span><div><h1>{profile.name}</h1><p>Profile settings</p></div></div>
    {message && <p className="account-feedback" role="status">{message}</p>}{error && <p className="account-error" role="alert">{error}</p>}
    <section className="account-card"><Link className="account-row" to={`/manage-profiles?edit=${encodeURIComponent(profile.id)}&from=account-profiles`}><span><strong>Edit profile</strong><small>Change profile name or icon</small></span><AccountIcon type="arrow" /></Link></section>
    <section className="account-section"><h2>Profile preferences</h2><form className="account-card account-card-body" key={profile.id} onSubmit={(event) => {
      event.preventDefault();
      const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
      if (!name) { setError("Please enter a profile name."); return; }
      const next = readProfiles().map((item) => item.id === profile.id ? { ...item, name } : item);
      try { localStorage.setItem(profilesStorageKey, JSON.stringify(next)); setProfiles(next); setError(""); setMessage("Your profile has been updated."); }
      catch { setError("Your changes couldn't be saved. Allow browser storage and try again."); }
    }}><label className="account-field">Profile name<input name="name" defaultValue={profile.name} required maxLength={24} /></label><div className="account-profile-info"><strong>Profile type</strong><p>{profile.isKids ? "Kids profile" : "Personal profile"}</p></div><button className="account-button account-button--primary" type="submit">Save</button></form></section>
    {profile.id !== profiles[0]?.id && <Link className="account-button account-membership-action" to={`/manage-profiles?edit=${encodeURIComponent(profile.id)}&from=account-profiles`}>Manage or delete profile</Link>}
  </>;
  return <>
    <div className="account-title"><h1>Profiles</h1><p>Manage profiles and personalize your experience.</p></div>
    <section aria-labelledby="profile-settings-title"><h2 className="account-section-title" id="profile-settings-title">Profile settings</h2><p className="account-description">Choose a profile to change its name, icon, and settings.</p><div className="account-card">
      {profiles.map((item) => <Link className="account-profile" key={item.id} to={`/account/profiles/${encodeURIComponent(item.id)}`} aria-label={`Manage ${item.name} profile`}><span className="account-profile__avatar"><ProfileFace color={item.color} isKids={item.isKids} /></span><span className="account-profile__identity"><strong>{item.name}</strong>{item.id === activeProfile.id ? <span>Your profile</span> : item.isKids ? <span>Kids profile</span> : null}</span><AccountIcon type="arrow" /></Link>)}
    </div>
    {profiles.length < 5 && <Link className="account-button account-add-profile" to="/manage-profiles?add=true&from=account-profiles"><span aria-hidden="true">＋</span> Add Profile</Link>}
    <p className="account-description account-profile-limit">{profiles.length} of 5 profiles. Add up to 5 profiles for people who live with you.</p>
    </section>
  </>;
}
