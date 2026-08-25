import { useEffect, useState } from "react";
import { recommendedBuilds, type Build } from "../data/builds";

interface RecommendedBuildsProps {
  isOpen: boolean;
  onClose: () => void;
}

function BuildCard({ build }: { build: Build }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="build-card">
      <div className="build-card-header">
        <div>
          <h3 className="build-name">{build.name}</h3>
          <div className="build-meta">
            {build.ascendancy} · {build.coreSkill}
          </div>
        </div>
        <button
          className="build-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "收起" : "展开"}
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      <div className="build-tags">
        {build.tags.map((tag) => (
          <span key={tag} className="build-tag">
            {tag}
          </span>
        ))}
        <span className={`build-pill budget-${build.budget}`}>{build.budget}</span>
        <span className={`build-pill difficulty-${build.difficulty}`}>
          {build.difficulty}
        </span>
      </div>

      <p className="build-summary">{build.summary}</p>

      {expanded && (
        <div className="build-details">
          <div className="build-detail-block">
            <h4>优势</h4>
            <ul>
              {build.pros.map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>
          <div className="build-detail-block">
            <h4>劣势</h4>
            <ul>
              {build.cons.map((con, i) => (
                <li key={i}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="build-links">
        {build.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="build-link"
          >
            {link.label}
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        ))}
      </div>
    </article>
  );
}

export function RecommendedBuilds({ isOpen, onClose }: RecommendedBuildsProps) {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommended-builds-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="recommended-builds-title">推荐 BD</h2>
            <p>赛季开荒与后期攻坚的常用流派参考</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        <div className="modal-body">
          {recommendedBuilds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </div>
    </div>
  );
}
