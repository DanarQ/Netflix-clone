import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { movies, type Movie } from "../data/movies";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
};

export default function WatchPage({ onMinimize }: { onMinimize: (movie: Movie) => void }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((item) => item.id === movieId);

  const player = useRef<HTMLVideoElement>(null);
  const page = useRef<HTMLElement>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const scheduleControlsHide = () => {
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    setControlsVisible(true);
    if (playing) {
      controlsTimer.current = setTimeout(() => setControlsVisible(false), 2500);
    }
  };

  useEffect(() => {
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    if (playing) controlsTimer.current = setTimeout(() => setControlsVisible(false), 2500);
    else setControlsVisible(true);

    return () => {
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, [playing]);

  if (!movie) {
    return <Navigate to="/" replace />;
  }

  const handleMinimize = () => {
    onMinimize(movie);
    navigate("/", { viewTransition: true });
  };

  const togglePlayback = () => {
    if (!player.current) return;
    if (player.current.paused) void player.current.play();
    else player.current.pause();
  };

  const seek = (time: number) => {
    if (!player.current) return;
    player.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (value: number) => {
    if (!player.current) return;
    player.current.volume = value;
    player.current.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    if (!player.current) return;
    player.current.muted = !player.current.muted;
    setMuted(player.current.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void page.current?.requestFullscreen();
  };

  return (
    <main
      ref={page}
      className={`watch-page${controlsVisible ? " controls-visible" : " controls-hidden"}`}
      tabIndex={-1}
      onMouseMove={scheduleControlsHide}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "k") {
          event.preventDefault();
          togglePlayback();
        }
        if (event.key === "Escape" && !document.fullscreenElement) handleMinimize();
      }}
    >
      <video
        ref={player}
        className="watch-player"
        src={movie.video}
        poster={movie.image}
        autoPlay
        playsInline
        onClick={togglePlayback}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => {
          setMuted(event.currentTarget.muted);
          setVolume(event.currentTarget.volume);
        }}
      >
        Browser kamu belum mendukung pemutar video HTML5.
      </video>

      <button
        className="watch-back"
        type="button"
        onClick={handleMinimize}
        aria-label="Kembali ke katalog dan kecilkan video"
      >
        <span aria-hidden="true">←</span>
        <span>Kembali</span>
      </button>

      <button
        className="watch-minimize"
        type="button"
        onClick={handleMinimize}
        aria-label="Kecilkan video"
      >
        <span aria-hidden="true">▾</span>
      </button>

      <div className="watch-title">
        <p>Now Playing</p>
        <h1>{movie.name}</h1>
        <span>
          {movie.genre} · {movie.type}
        </span>
      </div>

      <div
        className="watch-controls"
        aria-label="Kontrol media"
        onMouseEnter={() => {
          if (controlsTimer.current) clearTimeout(controlsTimer.current);
          setControlsVisible(true);
        }}
        onMouseLeave={scheduleControlsHide}
      >
        <input
          className="watch-progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label="Posisi video"
        />
        <div className="watch-control-row">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Jeda" : "Putar"}
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          </button>
          <button
            type="button"
            onClick={() => seek(Math.max(0, currentTime - 10))}
            aria-label="Mundur 10 detik"
          >
            −10
          </button>
          <button
            type="button"
            onClick={() => seek(Math.min(duration, currentTime + 10))}
            aria-label="Maju 10 detik"
          >
            +10
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
          >
            <span aria-hidden="true">{muted || volume === 0 ? "🔇" : "🔊"}</span>
          </button>
          <input
            className="watch-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={(event) => changeVolume(Number(event.target.value))}
            aria-label="Volume"
          />
          <span className="watch-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span className="watch-control-title">{movie.name}</span>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Layar penuh"
          >
            <span aria-hidden="true">⛶</span>
          </button>
        </div>
      </div>
    </main>
  );
}

