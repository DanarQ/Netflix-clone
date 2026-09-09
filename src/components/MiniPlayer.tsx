import type { Movie } from "../data/movies";
import YouTubeTrailer, { youtubeId } from "./YouTubeTrailer";

export default function MiniPlayer({
  movie,
  expanded = false,
  onMinimize,
  onRestore,
  onClose,
}: {
  movie: Movie;
  expanded?: boolean;
  onMinimize?: () => void;
  onRestore: () => void;
  onClose: () => void;
}) {
  return (
    <aside className={`mini-player persistent-player${expanded ? " persistent-player--expanded" : ""}`} aria-label={`${expanded ? "Pemutar" : "Mini player"} ${movie.name}`}>
      {youtubeId(movie.video) ? <YouTubeTrailer movie={movie} /> : <video src={movie.video} poster={movie.image} controls autoPlay playsInline />}
      <div className="mini-player__header">
        <button type="button" onClick={expanded ? onMinimize : onRestore} aria-label={expanded ? "Kecilkan pemutar" : "Buka kembali pemutar"}>
          {expanded ? "↙" : "↗"}
        </button>
        <button type="button" hidden={expanded} onClick={onClose} aria-label="Tutup mini player">
          ×
        </button>
      </div>
      <button hidden={expanded} className="mini-player__title" type="button" onClick={onRestore}>
        <strong>{movie.name}</strong>
        <span>
          {movie.genre} · {movie.type}
        </span>
      </button>
    </aside>
  );
}

