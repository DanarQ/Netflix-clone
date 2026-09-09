import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./styles/index.css";
import "./styles/home.css";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import ManageProfilesPage from "./pages/ManageProfilesPage";
import AccountPage from "./pages/account/AccountPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import type { Movie } from "./data/movies";

export function App() {
  const [miniMovie, setMiniMovie] = useState<Movie | null>(null);
  const [restoreScrollY, setRestoreScrollY] = useState<number | null>(() => {
    const saved = Number(sessionStorage.getItem("myflix-catalog-scroll"));
    return Number.isFinite(saved) && saved > 0 ? saved : null;
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            miniMovie={miniMovie}
            restoreScrollY={restoreScrollY}
            onScrollRestored={() => setRestoreScrollY(null)}
            onCloseMini={() => setMiniMovie(null)}
          />
        }
      />
      <Route
        path="/watch/:movieId"
        element={
          <WatchPage
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
  );
}

export default App;
