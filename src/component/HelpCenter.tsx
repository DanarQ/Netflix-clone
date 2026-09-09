import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import MyflixLogo from "./MyflixLogo";
import "../help.css";

const topics = [
  { title: "Account & Profiles", icon: "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 4a4 4 0 0 1 0 7M22 21v-3a4 4 0 0 0-3-4", articles: [
    { title: "How to create, edit, or delete profiles", text: "Open Profiles in your Account to manage the people watching. Choose a profile to edit its name or icon, or select Add Profile to create one. You can have up to 5 profiles. To delete a profile, open its editor and choose Delete Profile. The main profile cannot be deleted.", to: "/account/profiles", action: "Manage profiles" },
    { title: "How to switch profiles", text: "Open the profile menu at the top of the home page and select Switch Profiles. Choose a profile to return to the catalog. Your selected profile is remembered on this browser.", to: "/manage-profiles?mode=select", action: "Switch profiles" },
    { title: "Where are my account details saved?", text: "Myflix is a demo. Profiles and demo membership choices are saved in this browser, without an online account. They do not sync between devices. Clearing site data can reset these details.", to: "/account", action: "Go to Account" },
  ] },
  { title: "Membership & Payments", icon: "M3 5h18v14H3ZM3 9h18M6 15h4", articles: [
    { title: "How to change your plan", text: "Go to Membership, select Change plan, choose a demo plan, and confirm the change. Plan choices are for demonstration only; they do not change video quality or limit devices.", to: "/account/membership?view=plans", action: "Change demo plan" },
    { title: "How to cancel or restart membership", text: "Open Membership and select Cancel membership. Review the message and choose Finish cancellation. You can return and select Restart membership at any time. This only updates your demo status and keeps your profiles.", to: "/account/membership", action: "Manage membership" },
    { title: "Will I be charged for using Myflix?", text: "No. This project has no real subscription, payment processing, or billing. The payment information and history pages show an empty demo state. You do not need to enter card details.", to: "/account/membership?view=payment", action: "View payment information" },
  ] },
  { title: "Watching Myflix", icon: "M3 4h18v14H3ZM8 22h8M12 18v4M10 8l5 3-5 3Z", articles: [
    { title: "How to watch a movie", text: "Browse the home catalog and select a movie's play button. Myflix uses demonstration videos, so the video may differ from the title or artwork. Use the player controls to pause, seek, change volume, or enter full screen.", to: "/", action: "Browse movies" },
    { title: "Using the mini player", text: "Return to browsing with the player's minimize control to keep the video in a small player. Use the mini player's restore control to return to the full player, or its close control to dismiss it.", to: "/", action: "Back to browsing" },
    { title: "Keyboard controls for the player", text: "When the full player has keyboard focus, press Space or K to play or pause. Escape returns to browsing when you are not in full screen. You can also use Tab to move between controls and Enter to activate a button.", to: "/", action: "Find something to watch" },
  ] },
  { title: "Fix a Problem", icon: "M12 3 2 21h20ZM12 9v5M12 17v1", articles: [
    { title: "A video won't play or keeps buffering", text: "Check your internet connection and try playing the video again. Refresh the page if needed, and try a different title. Demo videos are loaded from external sources, so an unavailable source may prevent playback.", to: "/", action: "Return to movies" },
    { title: "My profile changes aren't saving", text: "Check that your browser allows this site to save data. If you see a save error, keep the editor open while you check browser settings, then try again. Private browsing may discard saved profiles when the session ends.", to: "/account/profiles", action: "Open Profiles" },
    { title: "My profiles disappeared", text: "Make sure you are using the same browser and site address as before. Clearing browser data or using another device can show the default profiles again. This demo has no server backup or profile recovery service.", to: "/account/profiles", action: "View profiles" },
  ] },
];

export default function HelpCenter() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const search = query.trim().toLowerCase();
  const input = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const searchMarker = useRef<HTMLDivElement>(null);
  const [searchPinned, setSearchPinned] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setSearchPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    if (searchMarker.current) observer.observe(searchMarker.current);
    return () => observer.disconnect();
  }, []);
  const results = topics.map((topic) => ({ ...topic, articles: topic.articles.filter((article) => `${topic.title} ${article.title} ${article.text}`.toLowerCase().includes(search)) })).filter((topic) => topic.articles.length);
  const count = results.reduce((total, topic) => total + topic.articles.length, 0);
  useEffect(() => { window.scrollTo(0, 0); heading.current?.focus({ preventScroll: true }); }, []);
  return <div className="help-page">
    <header className="help-header"><div className="help-header-inner"><div className="help-brand"><Link className="help-logo" to="/" aria-label="MYFLIX home"><MyflixLogo /></Link><span className="help-brand-divider" /><Link to="/help">Help Center</Link></div><div className="help-header-actions"><Link className="help-account-button" to="/">Browse Myflix</Link><Link className="help-account-button help-account-button--red" to="/account">My Account</Link></div></div></header>
    <main>
      <section className="help-hero" aria-labelledby="help-heading">
        <h1 id="help-heading" ref={heading} tabIndex={-1}>How can we help?</h1>
      </section>
      <div ref={searchMarker} className="help-search-marker" aria-hidden="true" />
      <div className={`help-search-sticky${searchPinned ? " is-pinned" : ""}`}><form className="help-search" role="search" onSubmit={(event) => { event.preventDefault(); document.getElementById("help-topics")?.scrollIntoView(); }}><button className="help-search-submit" type="submit" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></button><input ref={input} type="search" aria-label="Search help articles" placeholder="Type a question, topic or issue" value={query} onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })} />{query && <button type="button" onClick={() => { setParams({}, { replace: true }); input.current?.focus(); }} aria-label="Clear search">×</button>}</form></div>
      <div className="help-hero-bottom">
        <p className="help-popular">Popular topics: <button onClick={() => setParams({ q: "profiles" }, { replace: true })}>Manage profiles</button><span>,</span><button onClick={() => setParams({ q: "plan" }, { replace: true })}>Plans and membership</button><span>,</span><button onClick={() => setParams({ q: "video" }, { replace: true })}>Watching Myflix</button></p>
        <a className="help-explore" href="#help-topics">Explore Topics <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v17m-7-7 7 7 7-7" /></svg></a>
      </div>
      <div className="help-content" id="help-topics">
        <div className={`help-section-heading${search ? "" : " help-visually-hidden"}`}><h2>{search ? "Search results" : "Explore Topics"}</h2><p role="status" aria-live="polite">{search ? `${count} ${count === 1 ? "article" : "articles"} found` : "Browse help articles by topic."}</p></div>
        {count ? <div className="help-topics">{results.map((topic) => <section className="help-topic" key={topic.title} aria-label={topic.title}><div className="help-topic-heading"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={topic.icon} /></svg><h3>{topic.title}</h3></div>{topic.articles.map((article) => <details key={article.title} className="help-article"><summary>{article.title}<span aria-hidden="true">+</span></summary><div className="help-answer"><p>{article.text}</p><Link to={article.to}>{article.action} <span aria-hidden="true">→</span></Link></div></details>)}</section>)}</div> : <div className="help-empty"><h3>No results for “{query}”</h3><p>Try a shorter search, such as “profile”, “plan”, or “video”.</p><button onClick={() => { setParams({}, { replace: true }); input.current?.focus(); }}>View all help topics</button></div>}
        <section className="help-quick" aria-labelledby="help-quick-title"><h2 id="help-quick-title">Quick links</h2><div><Link to="/account/profiles">Manage profiles <span aria-hidden="true">↗</span></Link><Link to="/account/membership?view=plans">Change plan <span aria-hidden="true">↗</span></Link><Link to="/account/membership">Manage membership <span aria-hidden="true">↗</span></Link></div></section>
      </div>
    </main>
    <section className="help-contact" aria-labelledby="help-contact-title"><h2 id="help-contact-title">Need more help?</h2><a className="help-return" href="#help-support">Contact Us</a><div id="help-support" className="help-support"><h3>Support for this demo</h3><p>Live chat and phone support are not available for Myflix. Browse the help topics above or open your Account to manage profiles and demo membership.</p><Link to="/account">Go to My Account →</Link></div></section>
    <footer className="help-footer"><div className="help-footer-inner"><p className="help-language">English <span>Help Center</span></p><div className="help-footer-links"><Link to="/">Back to Myflix</Link><Link to="/account">My Account</Link><a href="#help-topics">Help topics</a></div><p>Myflix is a demo project. Live support and real billing are not available.</p></div></footer>
  </div>;
}
