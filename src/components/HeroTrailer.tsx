import { useEffect, useRef, useState } from "react";
import type { Movie } from "../data/movies";
import { youtubeId } from "./YouTubeTrailer";

type Player = {
  playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void;
  isMuted(): boolean; destroy(): void; getIframe(): HTMLIFrameElement;
};
type YouTube = { Player: new (element: HTMLElement, options: {
  videoId: string; host: string; playerVars: Record<string, string | number>;
  events: { onReady(event: { target: Player }): void; onStateChange(event: { data: number }): void; onAutoplayBlocked(): void; onError(): void };
}) => Player };
let apiPromise: Promise<YouTube> | undefined;
function loadAPI() {
  const ytWindow = window as Window & { YT?: YouTube; onYouTubeIframeAPIReady?: () => void };
  if (ytWindow.YT?.Player) return Promise.resolve(ytWindow.YT);
  return apiPromise ??= new Promise<YouTube>((resolve, reject) => {
    const previous = ytWindow.onYouTubeIframeAPIReady;
    ytWindow.onYouTubeIframeAPIReady = () => { previous?.(); resolve(ytWindow.YT!); };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => { apiPromise = undefined; reject(new Error("YouTube unavailable")); };
    document.head.append(script);
  });
}

export default function HeroTrailer({ movie }: { movie: Movie }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let visible = true;
    let pausedByUser = false;
    let fallbackAttempted = false;
    let instance: Player | null = null;
    const syncVisibility = () => {
      if (!player.current) return;
      if (visible && !document.hidden && !pausedByUser) player.current.playVideo();
      else player.current.pauseVideo();
    };
    // The button records user intent independently from automatic visibility pauses.
    const onPauseIntent = (event: Event) => {
      pausedByUser = (event as CustomEvent<boolean>).detail;
      syncVisibility();
    };
    const container = host.current!;
    container.addEventListener("hero-pause", onPauseIntent);
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      syncVisibility();
    }, { threshold: 0.2 });
    observer.observe(container);
    document.addEventListener("visibilitychange", syncVisibility);
    loadAPI().then(api => {
      if (disposed) return;
      const mount = document.createElement("div");
      container.append(mount);
      instance = new api.Player(mount, {
        videoId: youtubeId(movie.video)!, host: "https://www.youtube-nocookie.com",
        playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0, origin: location.origin },
        events: {
          onReady: ({ target }) => {
            if (disposed) return;
            player.current = target;
            target.getIframe().title = `Pratinjau ${movie.name}`;
            target.getIframe().tabIndex = -1;
            target.unMute();
            setReady(true);
            syncVisibility();
          },
          onStateChange: ({ data }) => {
            if (disposed) return;
            setPlaying(data === 1);
            if (data === 0) pausedByUser = true;
            if (player.current) setMuted(player.current.isMuted());
          },
          onAutoplayBlocked: () => {
            if (disposed || fallbackAttempted || !player.current) return;
            fallbackAttempted = true;
            player.current.mute();
            setMuted(true);
            syncVisibility();
          },
          onError: () => { if (!disposed) setFailed(true); },
        },
      });
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      container.removeEventListener("hero-pause", onPauseIntent);
      player.current = null;
      instance?.destroy();
      container.replaceChildren();
    };
  }, [movie.id, movie.video, movie.name]);

  return <>
    <div ref={host} className={`hero-trailer${ready && !failed ? " hero-trailer--ready" : ""}`} aria-hidden="true" />
    {!failed && <div className="hero-preview-controls">
      <button className="hero-preview-pause" type="button" disabled={!ready} aria-label={playing ? "Jeda pratinjau" : "Putar pratinjau"}
        onClick={() => host.current?.dispatchEvent(new CustomEvent("hero-pause", { detail: playing }))}>
        {playing ? "Ⅱ" : "▶"}
      </button>
      <button type="button" disabled={!ready} aria-label={muted ? "Nyalakan suara pratinjau" : "Matikan suara pratinjau"}
        aria-pressed={!muted} onClick={() => {
          if (!player.current) return;
          if (muted) player.current.unMute(); else player.current.mute();
          setMuted(!muted);
        }} title={muted ? "Nyalakan suara" : "Matikan suara"}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {muted ? <path d="m16 9 6 6m0-6-6 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
        </svg>
      </button>
    </div>}
  </>;
}
