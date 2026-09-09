import { useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import "./index.css";
import "./home.css";
import Navbar from "./component/Navbar";
import Movies from "./component/Movies";
import MiniPlayer from "./component/MiniPlayer";
import ManageProfiles from "./component/ManageProfiles";
import Account from "./component/Account";
import HelpCenter from "./component/HelpCenter";
import WatchPage from "./component/WatchPage";
import { movies, type Movie } from "./data/movies";

function HomePage({ miniMovie, restoreScrollY, onScrollRestored, onCloseMini }: {
  miniMovie: Movie | null;
  restoreScrollY: number | null;
  onScrollRestored: () => void;
  onCloseMini: () => void;
}) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (restoreScrollY === null) return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: restoreScrollY, behavior: "instant" });
      onScrollRestored();
    });
    return () => cancelAnimationFrame(frame);
  }, [restoreScrollY, onScrollRestored]);

  return (
    <>
      <a className="skip-link" href="#home">Lewati navigasi</a>
      <Navbar />
      <Movies onPlay={(movie) => {
        sessionStorage.setItem("myflix-catalog-scroll", String(window.scrollY));
        navigate(`/watch/${movie.id}`, { viewTransition: true });
      }} />
      <footer className="home-footer">
        <a href="#home">MYFLIX</a>
        <p>Proyek Netflix clone · Katalog ilustrasi dengan video demo.</p>
      </footer>
      {miniMovie && <MiniPlayer movie={miniMovie} onRestore={() => navigate(`/watch/${miniMovie.id}`, { viewTransition: true })} onClose={onCloseMini} />}
    </>
  );
}

function WatchMoviePage({ onMinimize }: { onMinimize: (movie: Movie) => void }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((item) => item.id === movieId);

  if (!movie) return <Navigate to="/" replace />;

  return <WatchPage movie={movie} onMinimize={() => { onMinimize(movie); navigate("/", { viewTransition: true }); }} />;
}

export function App() {
  const [miniMovie, setMiniMovie] = useState<Movie | null>(null);
  const [restoreScrollY, setRestoreScrollY] = useState<number | null>(() => {
    const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
    return Number.isFinite(saved) && saved > 0 ? saved : null;
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage miniMovie={miniMovie} restoreScrollY={restoreScrollY} onScrollRestored={() => setRestoreScrollY(null)} onCloseMini={() => setMiniMovie(null)} />} />
      <Route path="/watch/:movieId" element={<WatchMoviePage onMinimize={(movie) => {
        setMiniMovie(movie);
        const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
        setRestoreScrollY(Number.isFinite(saved) ? saved : 0);
      }} />} />
      <Route path="/manage-profiles" element={<ManageProfiles />} />
      <Route path="/account/*" element={<Account />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
