import type { Movie } from "../data/movies";

export function youtubeId(video: string): string | null {
  try {
    const url = new URL(video);
    const id = url.hostname === "youtu.be" ? url.pathname.slice(1)
      : ["www.youtube.com", "youtube.com"].includes(url.hostname) ? url.searchParams.get("v") : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

export default function YouTubeTrailer({ movie }: { movie: Movie }) {
  return <iframe
    className="youtube-trailer"
    src={`https://www.youtube-nocookie.com/embed/${youtubeId(movie.video)}?autoplay=1&playsinline=1&rel=0`}
    title={`Trailer ${movie.name}`}
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />;
}
