import type { Movie } from "../data/movies";

export default function MiniPlayer({
  movie,
  onRestore,
  onClose,
}: {
  movie: Movie;
  onRestore: () => void;
  onClose: () => void;
}) {
  return (
    <aside className="mini-player" aria-label={`Mini player ${movie.name}`}>
      <video src={movie.video} poster={movie.image} controls autoPlay playsInline />
      <div className="mini-player__header">
        <button type="button" onClick={onRestore} aria-label="Buka kembali pemutar">
          ↗
        </button>
        <button type="button" onClick={onClose} aria-label="Tutup mini player">
          ×
        </button>
      </div>
      <button className="mini-player__title" type="button" onClick={onRestore}>
        <strong>{movie.name}</strong>
        <span>
          {movie.genre} · {movie.type}
        </span>
      </button>
    </aside>
  );
}

