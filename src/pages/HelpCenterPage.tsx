import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import MyflixLogo from "../components/MyflixLogo";
import { helpTopics } from "../data/helpTopics";
import "../styles/help.css";

export default function HelpCenterPage() {
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

  const results = helpTopics
    .map((topic) => ({
      ...topic,
      articles: topic.articles.filter((article) =>
        `${topic.title} ${article.title} ${article.text}`.toLowerCase().includes(search)
      ),
    }))
    .filter((topic) => topic.articles.length);

  const count = results.reduce((total, topic) => total + topic.articles.length, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="help-page">
      <header className="help-header">
        <div className="help-header-inner">
          <div className="help-brand">
            <Link className="help-logo" to="/" aria-label="MYFLIX home">
              <MyflixLogo />
            </Link>
            <span className="help-brand-divider" />
            <Link to="/help">Help Center</Link>
          </div>
          <div className="help-header-actions">
            <Link className="help-account-button" to="/">
              Browse Myflix
            </Link>
            <Link className="help-account-button help-account-button--red" to="/account">
              My Account
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="help-hero" aria-labelledby="help-heading">
          <h1 id="help-heading" ref={heading} tabIndex={-1}>
            How can we help?
          </h1>
        </section>
        <div ref={searchMarker} className="help-search-marker" aria-hidden="true" />
        <div className={`help-search-sticky${searchPinned ? " is-pinned" : ""}`}>
          <form
            className="help-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById("help-topics")?.scrollIntoView();
            }}
          >
            <button className="help-search-submit" type="submit" aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </button>
            <input
              ref={input}
              type="search"
              aria-label="Search help articles"
              placeholder="Type a question, topic or issue"
              value={query}
              onChange={(event) =>
                setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })
              }
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setParams({}, { replace: true });
                  input.current?.focus();
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </form>
        </div>

        <div className="help-hero-bottom">
          <p className="help-popular">
            Popular topics:{" "}
            <button onClick={() => setParams({ q: "profiles" }, { replace: true })}>
              Manage profiles
            </button>
            <span>,</span>
            <button onClick={() => setParams({ q: "plan" }, { replace: true })}>
              Plans and membership
            </button>
            <span>,</span>
            <button onClick={() => setParams({ q: "video" }, { replace: true })}>
              Watching Myflix
            </button>
          </p>
          <a className="help-explore" href="#help-topics">
            Explore Topics{" "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3v17m-7-7 7 7 7-7" />
            </svg>
          </a>
        </div>

        <div className="help-content" id="help-topics">
          <div className={`help-section-heading${search ? "" : " help-visually-hidden"}`}>
            <h2>{search ? "Search results" : "Explore Topics"}</h2>
            <p role="status" aria-live="polite">
              {search
                ? `${count} ${count === 1 ? "article" : "articles"} found`
                : "Browse help articles by topic."}
            </p>
          </div>

          {count ? (
            <div className="help-topics">
              {results.map((topic) => (
                <section className="help-topic" key={topic.title} aria-label={topic.title}>
                  <div className="help-topic-heading">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={topic.icon} />
                    </svg>
                    <h3>{topic.title}</h3>
                  </div>
                  {topic.articles.map((article) => (
                    <details key={article.title} className="help-article">
                      <summary>
                        {article.title}
                        <span aria-hidden="true">+</span>
                      </summary>
                      <div className="help-answer">
                        <p>{article.text}</p>
                        <Link to={article.to}>
                          {article.action} <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </details>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="help-empty">
              <h3>No results for “{query}”</h3>
              <p>Try a shorter search, such as “profile”, “plan”, or “video”.</p>
              <button
                onClick={() => {
                  setParams({}, { replace: true });
                  input.current?.focus();
                }}
              >
                View all help topics
              </button>
            </div>
          )}

          <section className="help-quick" aria-labelledby="help-quick-title">
            <h2 id="help-quick-title">Quick links</h2>
            <div>
              <Link to="/account/profiles">
                Manage profiles <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/account/membership?view=plans">
                Change plan <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/account/membership">
                Manage membership <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <section className="help-contact" aria-labelledby="help-contact-title">
        <h2 id="help-contact-title">Need more help?</h2>
        <a className="help-return" href="#help-support">
          Contact Us
        </a>
        <div id="help-support" className="help-support">
          <h3>Support for this demo</h3>
          <p>
            Live chat and phone support are not available for Myflix. Browse the help topics above or
            open your Account to manage profiles and demo membership.
          </p>
          <Link to="/account">Go to My Account →</Link>
        </div>
      </section>

      <footer className="help-footer">
        <div className="help-footer-inner">
          <p className="help-language">
            English <span>Help Center</span>
          </p>
          <div className="help-footer-links">
            <Link to="/">Back to Myflix</Link>
            <Link to="/account">My Account</Link>
            <a href="#help-topics">Help topics</a>
          </div>
          <p>Myflix is a demo project. Live support and real billing are not available.</p>
        </div>
      </footer>
    </div>
  );
}
