interface HeaderProps {
  onOpenBuilds: () => void;
  onOpenMeta: () => void;
}

export function Header({ onOpenBuilds, onOpenMeta }: HeaderProps) {
  return (
    <header className="app-header">
      <a className="brand" href="#top">
        POE · 国际服助手
      </a>
      <nav>
        <a href="#start">新手起步</a>
        <a href="#trade">交易经济</a>
        <a href="#builds">BD 流派</a>
        <button className="nav-button" onClick={onOpenBuilds}>
          推荐 BD
        </button>
        <button className="nav-button" onClick={onOpenMeta}>
          本赛季 META
        </button>
      </nav>
    </header>
  );
}
