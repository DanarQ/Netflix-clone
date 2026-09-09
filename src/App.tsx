import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, matchPath } from "react-router";
import "./styles/index.css";
import "./styles/home.css";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import ManageProfilesPage from "./pages/ManageProfilesPage";
import AccountPage from "./pages/account/AccountPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import { movies, type Movie } from "./data/movies";
import MiniPlayer from "./components/MiniPlayer";
import { youtubeId } from "./components/YouTubeTrailer";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const match = matchPath("/watch/:movieId", location.pathname);
  const routeMovie = movies.find(movie => movie.id === match?.params.movieId);
  const youtubeMovie = routeMovie && youtubeId(routeMovie.video) ? routeMovie : null;
  const [activeTrailer, setActiveTrailer] = useState<Movie | null>(youtubeMovie);
  useEffect(() => {
    if (youtubeMovie) setActiveTrailer(youtubeMovie);
    else if (routeMovie) setActiveTrailer(null);
  }, [youtubeMovie, routeMovie]);
  const trailer = youtubeMovie ?? (routeMovie ? null : activeTrailer);
  const [miniMovie, setMiniMovie] = useState<Movie | null>(null);
  const [restoreScrollY, setRestoreScrollY] = useState<number | null>(() => {
    const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
    return Number.isFinite(saved) && saved > 0 ? saved : null;
  });

  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            miniMovie={miniMovie}
            hasActiveTrailer={Boolean(trailer)}
            restoreScrollY={restoreScrollY}
            onScrollRestored={() => setRestoreScrollY(null)}
            onCloseMini={() => setMiniMovie(null)}
          />
        }
      />
      <Route
        path="/watch/:movieId"
        element={
          youtubeMovie ? null : <WatchPage
            onMinimize={(movie) => {
              setMiniMovie(movie);
              const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
              setRestoreScrollY(Number.isFinite(saved) ? saved : 0);
            }}
          />
        }
      />
      <Route path="/manage-profiles" element={<ManageProfilesPage />} />
      <Route path="/account/*" element={<AccountPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    {trailer && <MiniPlayer
      movie={trailer}
      expanded={Boolean(youtubeMovie)}
      onMinimize={() => {
        const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
        setRestoreScrollY(Number.isFinite(saved) ? saved : 0);
        navigate("/");
      }}
      onRestore={() => navigate(`/watch/${trailer.id}`)}
      onClose={() => setActiveTrailer(null)}
    />}
    </>
  );
}

export default App;
