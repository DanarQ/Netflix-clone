import { useEffect, useRef } from "react";
import { Link } from "react-router";
import MyflixLogo from "./MyflixLogo";
import { readActiveProfile } from "../data/profiles";

const links = [
  { label: "Home", href: "#home" },
  { label: "Tv Shows", href: "#tvshows" },
  { label: "Movies", href: "#movies" },
  { label: "Recently Watch", href: "#recentlywatch" },
  { label: "My List", href: "#mylist" },
];

export function Navbar() {
  const activeProfile = readActiveProfile();
  const profileRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeProfileOnOutsideClick = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        profileRef.current?.removeAttribute("open");
      }
    };

    const closeProfileOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        profileRef.current?.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", closeProfileOnOutsideClick);
    document.addEventListener("keydown", closeProfileOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeProfileOnOutsideClick);
      document.removeEventListener("keydown", closeProfileOnEscape);
    };
  }, []);

  return (
    <header className="netflix-navbar">
      <Link className="netflix-navbar__logo" to="/" aria-label="MYFLIX home">
        <MyflixLogo />
      </Link>

      <nav className="netflix-navbar__desktop" aria-label="Navigasi utama">
        <ul className="netflix-navbar__links">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <details className="netflix-navbar__mobile">
        <summary>
          Browse <span aria-hidden="true">▾</span>
        </summary>
        <nav aria-label="Navigasi seluler">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </details>

      <details ref={profileRef} className="netflix-navbar__profile">
        <summary aria-label="Buka menu profil pengguna">
          <span className="netflix-navbar__avatar" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="4" fill={activeProfile.color} />
              <circle cx="10" cy="12" r="2" fill="white" />
              <circle cx="23" cy="12" r="2" fill="white" />
              <path d="M9 21c4 4 10 4 15-1" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="netflix-navbar__profile-arrow" aria-hidden="true">
            ▾
          </span>
        </summary>

        <nav className="netflix-navbar__profile-menu" aria-label="Menu profil">
          <div className="netflix-navbar__profile-user">
            <span className="netflix-navbar__avatar" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill={activeProfile.color} />
                <circle cx="10" cy="12" r="2" fill="white" />
                <circle cx="23" cy="12" r="2" fill="white" />
                <path d="M9 21c4 4 10 4 15-1" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span>{activeProfile.name}</span>
          </div>
          <Link to="/manage-profiles?mode=select">Switch Profiles</Link>
          <Link to="/manage-profiles">Manage Profiles</Link>
          <Link to="/account">Account</Link>
          <Link to="/help">Help Center</Link>
          <a className="netflix-navbar__sign-out" href="#sign-out">
            Sign out of Myflix
          </a>
        </nav>
      </details>
    </header>
  );
}

export default Navbar;

