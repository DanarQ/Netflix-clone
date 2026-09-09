import { useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router";
import MyflixLogo from "../../components/MyflixLogo";
import AccountIcon from "../../components/AccountIcon";
import ProfileFace from "../../components/ProfileFace";
import { readActiveProfile } from "../../data/profiles";
import "../../styles/account.css";
import AccountOverview from "./AccountOverview";
import MembershipView from "./MembershipView";
import AccountProfiles from "./AccountProfiles";

export default function AccountPage() {
  const location = useLocation();
  const content = useRef<HTMLElement>(null);
  const profile = readActiveProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
    content.current?.focus({ preventScroll: true });
  }, [location.pathname, location.search]);

  return (
    <div className="account-page">
      <header className="account-header">
        <Link className="account-logo" to="/" aria-label="MYFLIX home">
          <MyflixLogo />
        </Link>
        <Link
          className="account-header-profile"
          to="/manage-profiles?mode=select"
          aria-label="Switch profiles"
        >
          <ProfileFace color={profile.color} />
          <span aria-hidden="true">▾</span>
        </Link>
      </header>

      <div className="account-layout">
        <aside className="account-sidebar">
          <Link className="account-back" to="/">
            ← Back to Myflix
          </Link>
          <nav className="account-nav" aria-label="Account sections">
            <NavLink to="/account" end>
              <AccountIcon type="overview" />
              Overview
            </NavLink>
            <NavLink to="/account/membership">
              <AccountIcon type="membership" />
              Membership
            </NavLink>
            <NavLink to="/account/profiles">
              <AccountIcon type="profiles" />
              Profiles
            </NavLink>
          </nav>
        </aside>

        <main className="account-content" ref={content} tabIndex={-1}>
          <Routes>
            <Route index element={<AccountOverview />} />
            <Route path="membership" element={<MembershipView />} />
            <Route path="profiles" element={<AccountProfiles />} />
            <Route path="profiles/:profileId" element={<AccountProfiles />} />
            <Route
              path="*"
              element={
                <>
                  <h1>Page not found</h1>
                  <Link to="/account">Back to Account</Link>
                </>
              }
            />
          </Routes>

          <footer className="account-footer">
            <p>
              Demo account. Changes are saved on this browser. No charges or real subscription.
            </p>
            <span>MYFLIX</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
