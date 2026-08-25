import { useEffect, useRef, useState } from "react";
import { recommendedBuilds } from "../data/builds";

interface RecommendedBuildsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  { id: "overview", label: "概述" },
  { id: "pros-cons", label: "优劣" },
  { id: "gear", label: "装备" },
  { id: "skills", label: "技能" },
  { id: "tree", label: "天赋" },
  { id: "progression", label: "开荒路线" },
];

export function RecommendedBuilds({ isOpen, onClose }: RecommendedBuildsProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");

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

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const handleScroll = () => {
      const scrollTop = panel.scrollTop;
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(`section-${section.id}`);
        if (el && el.offsetTop - 120 <= scrollTop) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    panel.addEventListener("scroll", handleScroll);
    return () => panel.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const scrollTo = (id: string) => {
    const panel = panelRef.current;
    const el = document.getElementById(`section-${id}`);
    if (panel && el) {
      panel.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  const build = recommendedBuilds[0];
  if (!build) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="guide-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        <div className="guide-sidebar">
          <div className="guide-brand">
            <a className="brand" href="#top" onClick={onClose}>
              POE · 国际服助手
            </a>
          </div>
          <nav className="guide-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={activeSection === s.id ? "active" : ""}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <a
            href={build.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="guide-external"
          >
            查看 Maxroll 原文
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>

        <div className="guide-content" ref={panelRef}>
          <button className="guide-close" onClick={onClose} aria-label="关闭">
            ×
          </button>

          <header className="guide-hero">
            <div className="guide-tags">
              {build.tags.map((tag) => (
                <span key={tag} className="guide-tag">
                  {tag}
                </span>
              ))}
              <span className={`guide-pill budget-${build.budget}`}>{build.budget}</span>
              <span className={`guide-pill difficulty-${build.difficulty}`}>
                {build.difficulty}
              </span>
            </div>
            <h1 id="guide-title">{build.name}</h1>
            <p className="guide-subtitle">{build.nameEn}</p>
            <p className="guide-meta">
              {build.ascendancy} · {build.coreSkill}
            </p>
            <p className="guide-summary">{build.summary}</p>
          </header>

          <section id="section-overview" className="guide-section">
            <h2>概述</h2>
            <div className="guide-body">
              {build.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section id="section-pros-cons" className="guide-section">
            <h2>优势与劣势</h2>
            <div className="guide-pros-cons">
              <div>
                <h3>优势</h3>
                <ul>
                  {build.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>劣势</h3>
                <ul>
                  {build.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="section-gear" className="guide-section">
            <h2>装备</h2>
            <div className="guide-table-wrap">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>部位</th>
                    <th>装备</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  {build.gear.map((item, i) => (
                    <tr key={i}>
                      <td>{item.slot}</td>
                      <td>{item.name}</td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="section-skills" className="guide-section">
            <h2>技能连接</h2>
            <div className="guide-skills">
              {build.skills.map((skill, i) => (
                <div key={i} className="skill-card">
                  <h3>{skill.name}</h3>
                  <div className="skill-gems">
                    {skill.gems.map((gem) => (
                      <span key={gem} className="skill-gem">
                        {gem}
                      </span>
                    ))}
                  </div>
                  {skill.note && <p>{skill.note}</p>}
                </div>
              ))}
            </div>
          </section>

          <section id="section-tree" className="guide-section">
            <h2>天赋、升华与万神殿</h2>
            <div className="guide-tree">
              <div>
                <h3>升华顺序</h3>
                <ol>
                  {build.ascendancyOrder.map((node, i) => (
                    <li key={i}>{node}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3>万神殿</h3>
                <p>
                  <strong>主神：</strong>
                  {build.pantheon.major}
                </p>
                <p>
                  <strong>小神：</strong>
                  {build.pantheon.minor}
                </p>
              </div>
              <div>
                <h3>盗贼任务</h3>
                <p>{build.bandit}</p>
              </div>
              <div>
                <h3>天赋树</h3>
                <p className="guide-placeholder">{build.treeUrl}</p>
              </div>
            </div>
          </section>

          <section id="section-progression" className="guide-section">
            <h2>开荒路线</h2>
            <div className="guide-timeline">
              {build.levelProgression.map((step, i) => (
                <div key={i} className="timeline-item">
                  <span className="timeline-dot" />
                  <div>
                    <h3>{step.level}</h3>
                    <p>{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="guide-footer">
            <p>
              内容基于 Maxroll 指南整理，具体数值与赛季版本请以{" "}
              <a href={build.links[0].href} target="_blank" rel="noopener noreferrer">
                Maxroll 原文
              </a>{" "}
              为准。
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
