import { useRef } from "react";
import type { Movie } from "../data/movies";

export default function MovieRow({
  id,
  heading,
  items,
  onSelect,
  empty,
}: {
  id: string;
  heading: string;
  items: Movie[];
  onSelect: (title: Movie) => void;
  empty?: string;
}) {
  const row = useRef<HTMLDivElement>(null);

  return (
    <section id={id} className="title-section" aria-labelledby={`${id}-heading`}>
      <div className="row-heading">
        <h2 id={`${id}-heading`}>{heading}</h2>
        {items.length > 0 && (
          <div className="row-controls">
            <button
              aria-label={`Geser ${heading} ke kiri`}
              onClick={() => row.current?.scrollBy({ left: -(row.current?.clientWidth ?? 300) })}
            >
              ‹
            </button>
            <button
              aria-label={`Geser ${heading} ke kanan`}
              onClick={() => row.current?.scrollBy({ left: row.current?.clientWidth ?? 300 })}
            >
              ›
            </button>
          </div>
        )}
      </div>
      {items.length ? (
        <div className="title-row" ref={row}>
          {items.map((title) => (
            <button
              key={title.id}
              className="title-card"
              onClick={() => onSelect(title)}
              aria-label={`Lihat detail ${title.name}`}
            >
              <img src={title.image} alt="" loading="lazy" />
              <span className="card-brand" aria-hidden="true">
                M
              </span>
              <span className="card-copy">
                <strong>{title.name}</strong>
                <span>
                  {title.genre} · {title.type}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-row">{empty}</p>
      )}
    </section>
  );
}

