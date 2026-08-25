import { useEffect, useRef } from "react";
import metaData from "../data/season-meta.json";

interface SeasonMetaProps {
  isOpen: boolean;
  onClose: () => void;
}

function Trend({ trend }: { trend: string }) {
  const cls =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-rose-400"
        : "text-[var(--bronze)]";
  const icon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  return (
    <span className={`text-xs font-medium ${cls}`} aria-label={`trend ${trend}`}>
      {icon}
    </span>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="meta-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function SeasonMeta({ isOpen, onClose }: SeasonMetaProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { league, updatedAt, sourceUrl, notice, ascendancy, equipment, skills } =
    metaData;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="meta-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="meta-title"
      >
        <button className="guide-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="meta-content" ref={panelRef}>
          <header className="meta-hero">
            <div className="meta-hero-inner">
              <div className="meta-label">Path of Exile 1</div>
              <h1 id="meta-title">
                本赛季 META <em>·</em> {league}
              </h1>
              <div className="meta-sub">
                Data mirrored from{" "}
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  poe.ninja
                </a>{" "}
                · Updated {new Date(updatedAt).toLocaleDateString("zh-CN")}
              </div>
            </div>
          </header>

          <p className="meta-notice">{notice}</p>

          <div className="meta-grid">
            <SectionCard title={ascendancy.title}>
              <div className="meta-table-wrap">
                <table className="meta-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Ascendancy</th>
                      <th>Usage</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ascendancy.items.map((item) => (
                      <tr key={item.name}>
                        <td>#{item.rank}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="meta-bar">
                            <span
                              className="meta-bar-fill"
                              style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                            />
                            <span className="meta-bar-text">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <Trend trend={item.trend} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title={equipment.title}>
              <div className="meta-table-wrap">
                <table className="meta-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipment.items.map((item, idx) => (
                      <tr key={item.name}>
                        <td>#{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>
                          <div className="meta-bar">
                            <span
                              className="meta-bar-fill"
                              style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                            />
                            <span className="meta-bar-text">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title={skills.title}>
              <div className="meta-table-wrap">
                <table className="meta-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Skill</th>
                      <th>Type</th>
                      <th>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.items.map((item, idx) => (
                      <tr key={item.name}>
                        <td>#{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>
                          <div className="meta-bar">
                            <span
                              className="meta-bar-fill"
                              style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                            />
                            <span className="meta-bar-text">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          <footer className="meta-footer">
            <p>
              Real-time data is available on{" "}
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                poe.ninja / builds / {league.toLowerCase()}
              </a>
              . Game terminology is kept in English as in the original source.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SeasonMeta;
