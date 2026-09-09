import { useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router";
import MyflixLogo from "./MyflixLogo";
import Membership, { readMembership } from "./Membership";
import AccountProfiles from "./AccountProfiles";
import { ProfileFace } from "./ManageProfiles";
import { readActiveProfile } from "../data/profiles";
import "../account.css";

export function AccountIcon({ type }: { type: "overview" | "membership" | "profiles" | "arrow" | "card" }) {
  const paths = {
    overview: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
    membership: "M3 5h18v14H3ZM3 9h18M6 15h5",
    profiles: "M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 21v-2a8 8 0 0 1 16 0v2M19 4a4 4 0 0 1 0 8M21 16l1 5",
    arrow: "m9 5 7 7-7 7",
    card: "M3 5h18v14H3ZM3 9h18M6 15h3M12 15h3",
  };
  return <svg className="account-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]} /></svg>;
}

function Overview() {
  const membership = readMembership();
  return <>
    <div className="account-title"><h1>Account</h1><p>Membership details</p></div>
    <section className="account-card" aria-label="Membership details">
      <div className="account-ribbon">Demo membership</div>
      <div className="account-card-body"><h2>{membership.plan}</h2><p>{membership.cancelled ? "Membership cancelled" : "Enjoy your Myflix demo membership"}</p></div>
      <Link className="account-row" to="/account/membership"><span>Manage membership</span><AccountIcon type="arrow" /></Link>
    </section>
    <section className="account-section"><h2>Quick links</h2><div className="account-card">
      <Link className="account-row" to="/account/membership?view=plans"><AccountIcon type="membership" /><span>Change plan</span><AccountIcon type="arrow" /></Link>
      <Link className="account-row" to="/account/membership?view=payment"><AccountIcon type="card" /><span>Manage payment method</span><AccountIcon type="arrow" /></Link>
      <Link className="account-row" to="/account/profiles"><AccountIcon type="profiles" /><span>Manage profiles</span><AccountIcon type="arrow" /></Link>
    </div></section>
  </>;
}

export default function Account() {
  const location = useLocation();
  const content = useRef<HTMLElement>(null);
  const profile = readActiveProfile();
  useEffect(() => { window.scrollTo(0, 0); content.current?.focus({ preventScroll: true }); }, [location.pathname, location.search]);
  return <div className="account-page">
    <header className="account-header"><Link className="account-logo" to="/" aria-label="MYFLIX home"><MyflixLogo /></Link><Link className="account-header-profile" to="/manage-profiles?mode=select" aria-label="Switch profiles"><ProfileFace color={profile.color} /><span aria-hidden="true">▾</span></Link></header>
    <div className="account-layout">
      <aside className="account-sidebar"><Link className="account-back" to="/">← Back to Myflix</Link><nav className="account-nav" aria-label="Account sections">
        <NavLink to="/account" end><AccountIcon type="overview" />Overview</NavLink>
        <NavLink to="/account/membership"><AccountIcon type="membership" />Membership</NavLink>
        <NavLink to="/account/profiles"><AccountIcon type="profiles" />Profiles</NavLink>
      </nav></aside>
      <main className="account-content" ref={content} tabIndex={-1}>
        <Routes><Route index element={<Overview />} /><Route path="membership" element={<Membership />} /><Route path="profiles" element={<AccountProfiles />} /><Route path="profiles/:profileId" element={<AccountProfiles />} /><Route path="*" element={<><h1>Page not found</h1><Link to="/account">Back to Account</Link></>} /></Routes>
        <footer className="account-footer"><p>Demo account. Changes are saved on this browser. No charges or real subscription.</p><span>MYFLIX</span></footer>
      </main>
    </div>
  </div>;
}
