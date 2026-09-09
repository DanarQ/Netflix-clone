import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeroTrailer from "../components/HeroTrailer";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";
import MovieDetailModal from "../components/MovieDetailModal";
import MiniPlayer from "../components/MiniPlayer";
import MyflixLogo from "../components/MyflixLogo";
import { movies, type Movie } from "../data/movies";

const featured = movies[0]!;
const storageKey = "myflix-my-list";

function readMyList(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === "string" && movies.some((title) => title.id === id))
      : [];
  } catch {
    return [];
  }
}

export default function HomePage({
  miniMovie,
  hasActiveTrailer = false,
  restoreScrollY,
  onScrollRestored,
  onCloseMini,
}: {
  miniMovie: Movie | null;
  hasActiveTrailer?: boolean;
  restoreScrollY: number | null;
  onScrollRestored: () => void;
  onCloseMini: () => void;
}) {
  const navigate = useNavigate();
  const [myList, setMyList] = useState<string[]>(readMyList);
  const [selected, setSelected] = useState<Movie | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(myList));
    } catch {
      /* Keep list in memory when storage unavailable */
    }
  }, [myList]);

  useLayoutEffect(() => {
    if (restoreScrollY === null) return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: restoreScrollY, behavior: "instant" });
      onScrollRestored();
    });
    return () => cancelAnimationFrame(frame);
  }, [restoreScrollY, onScrollRestored]);

  const handlePlay = (movie: Movie) => {
    sessionStorage.setItem("myflix-catalog-scroll", String(window.scrollY));
    navigate(`/watch/${movie.id}`);
  };

  const toggleList = (movie: Movie) => {
    setMyList((current) =>
      current.includes(movie.id) ? current.filter((id) => id !== movie.id) : [...current, movie.id]
    );
  };

  return (
    <>
      <a className="skip-link" href="#home">
        Lewati navigasi
      </a>
      <Navbar />

      <main id="home" className="home-page">
        <section className="home-hero" aria-labelledby="featured-title">
          <img className="hero-image" src={featured.image} alt="" fetchPriority="high" />
          {!hasActiveTrailer && !miniMovie && !selected && <HeroTrailer movie={featured} />}
          <div className="hero-content">
            <p className="original-label">
              <MyflixLogo className="original-label__brand" /> {featured.type.toUpperCase()}
            </p>
            <p className="hero-eyebrow">TRAILER PILIHAN</p>
            <h1 id="featured-title">
              {featured.name}
            </h1>
            <p className="hero-meta">
              {featured.genre} <span>{featured.type}</span> <span>TRAILER</span>
            </p>
            <p className="hero-description">{featured.description}</p>
            <div className="hero-actions">
              <button className="action-button action-primary" onClick={() => handlePlay(featured)}>
                <span aria-hidden="true">▶</span> Putar Trailer
              </button>
              <button className="action-button action-secondary" onClick={() => setSelected(featured)}>
                <span aria-hidden="true">ⓘ</span> More Info
              </button>
              <button
                className="action-button action-secondary"
                aria-pressed={myList.includes(featured.id)}
                onClick={() => toggleList(featured)}
              >
                <span aria-hidden="true">{myList.includes(featured.id) ? "✓" : "+"}</span> My List
              </button>
            </div>
          </div>
        </section>

        <div className="home-catalog">
          <MovieRow id="trending" heading="Trailer Pilihan" items={movies.filter((_, index) => index < 8 || index % 3 === 0)} onSelect={setSelected} />
          <MovieRow
            id="tvshows"
            heading="TV Shows"
            items={movies.filter((title) => title.type === "Series")}
            onSelect={setSelected}
          />
          <MovieRow
            id="movies"
            heading="Movies for Your Next Night In"
            items={movies.filter((title) => title.type === "Film")}
            onSelect={setSelected}
          />
          {[
            { id: "animation", heading: "Dunia Animasi", genres: ["Animation"] },
            { id: "adventure", heading: "Aksi & Petualangan", genres: ["Action", "Adventure"] },
            { id: "fantasy", heading: "Sci-Fi & Fantasi", genres: ["Science Fiction", "Fantasy"] },
            { id: "thriller", heading: "Misteri & Ketegangan", genres: ["Thriller", "Mystery", "Horror"] },
            { id: "drama", heading: "Kisah yang Membekas", genres: ["Drama", "Documentary"] },
          ].map(row => <MovieRow key={row.id} id={row.id} heading={row.heading}
            items={movies.filter(movie => row.genres.includes(movie.genre))} onSelect={setSelected} />)}
          <MovieRow
            id="recentlywatch"
            heading="Recently Watched"
            items={[]}
            onSelect={setSelected}
            empty="Belum ada tontonan. Riwayat menonton akan muncul di sini."
          />
          <MovieRow
            id="mylist"
            heading="My List"
            items={movies.filter((title) => myList.includes(title.id))}
            onSelect={setSelected}
            empty="Simpan tontonan favoritmu lewat tombol + My List pada detail judul."
          />
        </div>
      </main>

      <footer className="home-footer">
        <a href="#home">MYFLIX</a>
        <p>Proyek Netflix clone · Katalog film dengan trailer YouTube.</p>
      </footer>

      <MovieDetailModal
        movie={selected}
        isInMyList={selected ? myList.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onPlay={handlePlay}
        onToggleList={toggleList}
      />

      {miniMovie && (
        <MiniPlayer
          movie={miniMovie}
          onRestore={() => navigate(`/watch/${miniMovie.id}`, { viewTransition: true })}
          onClose={onCloseMini}
        />
      )}
    </>
  );
}

