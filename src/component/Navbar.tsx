import "../index.css";

const links = [
  { label: "Home", href: "#home" },
  { label: "Tv Shows", href: "#tvshows" },
  { label: "Movies", href: "#movies" },
  {label: "Recently Watch", href: "#recentlywatch"},
  {label: "My List", href: "#mylist"}
];

export function Navbar() {
  return (
    <header className="netflix-navbar">
      <a className="netflix-navbar__logo" href="/" aria-label="MYFLIX home">
        MYFLIX
      </a>

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
        <summary>Browse <span aria-hidden="true">▾</span></summary>
        <nav aria-label="Navigasi seluler">
          {links.map(({ label, href }) => (
            <a key={href} href={href} onClick={(event) => {
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}>{label}</a>
          ))}
        </nav>
      </details>

      <div className="netflix-navbar__profile" role="img" aria-label="Profil pengguna">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#147d92" />
          <circle cx="10" cy="12" r="2" fill="white" />
          <circle cx="23" cy="12" r="2" fill="white" />
          <path d="M9 21c4 4 10 4 15-1" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </header>
  );
}

export default Navbar;
