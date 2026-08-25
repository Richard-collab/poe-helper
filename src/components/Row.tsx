interface RowProps {
  idx: string;
  name: string;
  en: string;
  desc: string;
  href: string;
}

export function Row({ idx, name, en, desc, href }: RowProps) {
  return (
    <a className="row" href={href} target="_blank" rel="noopener noreferrer">
      <span className="idx">{idx}</span>
      <span className="name">
        {name}
        <small>{en}</small>
      </span>
      <span className="desc">{desc}</span>
      <span className="arrow">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </a>
  );
}
