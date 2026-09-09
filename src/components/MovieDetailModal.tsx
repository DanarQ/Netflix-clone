import { useEffect, useRef } from "react";
import MyflixLogo from "./MyflixLogo";
import type { Movie } from "../data/movies";

export default function MovieDetailModal({
  movie,
  isInMyList,
  onClose,
  onPlay,
  onToggleList,
}: {
  movie: Movie | null;
  isInMyList: boolean;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  onToggleList: (movie: Movie) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!movie) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [movie]);

  return (
    <dialog
      className="title-dialog"
      aria-labelledby="detail-title"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      {movie && (
        <article>
          <div className="dialog-art">
            <img src={movie.image} alt="" />
            <button
              className="dialog-close"
              aria-label="Tutup detail"
              onClick={() => dialogRef.current?.close()}
              autoFocus
            >
              ×
            </button>
          </div>
          <div className="dialog-content">
            <p className="original-label">
              <MyflixLogo className="original-label__brand" /> {movie.type.toUpperCase()}
            </p>
            <h2 id="detail-title">{movie.name}</h2>
            <p className="dialog-meta">
              {movie.genre} · {movie.type}
            </p>
            <p>{movie.description}</p>
            <div className="dialog-actions">
              <button
                className="action-button action-primary"
                onClick={() => {
                  dialogRef.current?.close();
                  onPlay(movie);
                }}
              >
                <span aria-hidden="true">▶</span> Play
              </button>
              <button
                className="action-button action-secondary"
                aria-pressed={isInMyList}
                onClick={() => onToggleList(movie)}
              >
                {isInMyList ? "✓ Added to My List" : "+ My List"}
              </button>
            </div>
            <p className="preview-note">
              Video demo sementara. Sumber video akan dipindahkan ke backend Myflix.
            </p>
          </div>
        </article>
      )}
    </dialog>
  );
}

