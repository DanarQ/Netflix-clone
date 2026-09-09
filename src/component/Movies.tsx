import { useEffect, useRef, useState } from "react";
import MovieRow from "./MovieRow";
import MyflixLogo from "./MyflixLogo";
import { movies, type Movie } from "../data/movies";

const featured = movies[0]!;
const storageKey = "myflix-my-list";
function readMyList(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string" && movies.some(title => title.id === id)) : [];
  } catch { return []; }
}


export default function Movies({ onPlay }: { onPlay: (movie: Movie) => void }) {
  const [myList, setMyList] = useState<string[]>(readMyList);
  const [selected, setSelected] = useState<Movie | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(myList)); } catch { /* Keep the list usable in memory when storage is unavailable. */ }
  }, [myList]);
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);
  function toggleList(title: Movie) {
    setMyList(current => current.includes(title.id) ? current.filter(id => id !== title.id) : [...current, title.id]);
  }
  return <>
    <main id="home" className="home-page">
      <section className="home-hero" aria-labelledby="featured-title">
        <img className="hero-image" src={featured.image} alt="" fetchPriority="high" />
        <div className="hero-content">
          <p className="original-label"><MyflixLogo className="original-label__brand" /> SERIES</p>
          <p className="hero-eyebrow">WONDER IS JUST BEYOND THE UNKNOWN</p>
          <h1 id="featured-title">THE LAST<br />FRONTIER</h1>
          <p className="hero-meta">ADVENTURE <span>13+</span> SERIES <span>HD</span></p>
          <p className="hero-description">{featured.description}</p>
          <div className="hero-actions">
            <button className="action-button action-primary" onClick={() => onPlay(featured)}><span aria-hidden="true">▶</span> Play</button>
            <button className="action-button action-secondary" onClick={() => setSelected(featured)}><span aria-hidden="true">ⓘ</span> More Info</button>
            <button className="action-button action-secondary" aria-pressed={myList.includes(featured.id)} onClick={() => toggleList(featured)}><span aria-hidden="true">{myList.includes(featured.id) ? "✓" : "+"}</span> My List</button>
          </div>
        </div>
        <span className="hero-side-label">ADVENTURE / MYSTERY</span>
      </section>
      <div className="home-catalog">
        <MovieRow id="trending" heading="Trending Now" items={movies} onSelect={setSelected} />
        <MovieRow id="tvshows" heading="TV Shows" items={movies.filter(title => title.type === "Series")} onSelect={setSelected} />
        <MovieRow id="movies" heading="Movies for Your Next Night In" items={movies.filter(title => title.type === "Film")} onSelect={setSelected} />
        <MovieRow id="recentlywatch" heading="Recently Watched" items={[]} onSelect={setSelected} empty="Belum ada tontonan. Riwayat menonton akan muncul di sini." />
        <MovieRow id="mylist" heading="My List" items={movies.filter(title => myList.includes(title.id))} onSelect={setSelected} empty="Simpan tontonan favoritmu lewat tombol + My List pada detail judul." />
      </div>
    </main>
    <dialog className="title-dialog" aria-labelledby="detail-title" ref={dialog} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <article>
        <div className="dialog-art"><img src={selected.image} alt="" /><button className="dialog-close" aria-label="Tutup detail" onClick={() => dialog.current?.close()} autoFocus>×</button></div>
        <div className="dialog-content">
          <p className="original-label"><MyflixLogo className="original-label__brand" /> {selected.type.toUpperCase()}</p>
          <h2 id="detail-title">{selected.name}</h2>
          <p className="dialog-meta">{selected.genre} · {selected.type}</p>
          <p>{selected.description}</p>
          <div className="dialog-actions">
            <button className="action-button action-primary" onClick={() => { dialog.current?.close(); onPlay(selected); }}><span aria-hidden="true">▶</span> Play</button>
            <button className="action-button action-secondary" aria-pressed={myList.includes(selected.id)} onClick={() => toggleList(selected)}>{myList.includes(selected.id) ? "✓ Added to My List" : "+ My List"}</button>
          </div>
          <p className="preview-note">Video demo sementara. Sumber video akan dipindahkan ke backend Myflix.</p>
        </div>
      </article>}
    </dialog>
  </>;
}
