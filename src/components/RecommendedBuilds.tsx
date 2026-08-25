import { useEffect, useMemo, useRef, useState } from "react";
import buildData from "../data/maxroll-build.json";

interface RecommendedBuildsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "equipment", label: "Equipment" },
  { id: "skills", label: "Skills" },
  { id: "rotation", label: "Rotation" },
  { id: "passive-skill-tree", label: "Passive Skill Tree" },
  { id: "ascendancy", label: "Ascendancy" },
  { id: "pantheon-and-bandits", label: "Pantheon and Bandits" },
  { id: "path-of-building", label: "Path of Building" },
];

function sectionId(id: string) {
  return `section-${id}`;
}

function Html({ html }: { html: string }) {
  if (!html) return null;
  return (
    <div
      className="guide-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function GemList({ gems }: { gems: string[] }) {
  if (!gems?.length) return null;
  return (
    <div className="gem-list">
      {gems.map((gem) => (
        <span key={gem} className="gem-tag">
          {gem}
        </span>
      ))}
    </div>
  );
}

function SkillGroup({ group }: { group: any }) {
  return (
    <div className="skill-group">
      <span className="skill-slot">{group.slot || "Main"}</span>
      <GemList gems={group.gems || []} />
    </div>
  );
}

export function RecommendedBuilds({ isOpen, onClose }: RecommendedBuildsProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [activeProfile, setActiveProfile] = useState(0);

  const profile = buildData.profiles[activeProfile];

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
        const el = document.getElementById(sectionId(section.id));
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
    const el = document.getElementById(sectionId(id));
    if (panel && el) {
      panel.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
  };

  const pantheonMajor = useMemo(() => {
    const p = profile?.pantheon || {};
    const keys = Object.keys(p);
    if (!keys.length) return null;
    return keys[0];
  }, [profile]);

  const pantheonMinor = useMemo(() => {
    const p = profile?.pantheon || {};
    const keys = Object.keys(p);
    return keys[1] || null;
  }, [profile]);

  if (!isOpen) return null;

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

          <div className="guide-meta-side">
            <div className="guide-author">by {buildData.author}</div>
            <div className="guide-date">{buildData.date}</div>
            <div className="guide-tags-side">
              {buildData.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
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
            href={buildData.plannerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="guide-external"
          >
            Open in Maxroll Planner
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>

        <div className="guide-content" ref={panelRef}>
          <button className="guide-close" onClick={onClose} aria-label="Close">
            ×
          </button>

          <header
            className="guide-hero"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(18, 17, 16, 0.45), rgba(18, 17, 16, 0.95)), url(${buildData.featuredImage})`,
            }}
          >
            <div className="guide-hero-inner">
              <div className="guide-category">{buildData.category}</div>
              <h1 id="guide-title">{buildData.title}</h1>
              <div className="guide-meta-row">
                <span>by {buildData.author}</span>
                <span>·</span>
                <span>{buildData.date}</span>
                <span>·</span>
                <span>{buildData.tags.join(", ")}</span>
              </div>
            </div>
          </header>

          <section id={sectionId("introduction")} className="guide-section">
            <h2>Introduction</h2>
            <p className="guide-lead">
              This is a local mirror of the Maxroll build guide. Use the
              sidebar to navigate sections, or click the tabs below to compare
              different progression stages.
            </p>
          </section>

          <div className="profile-tabs">
            {buildData.profiles.map((p, idx) => (
              <button
                key={p.name}
                className={activeProfile === idx ? "active" : ""}
                onClick={() => setActiveProfile(idx)}
              >
                {p.name}
              </button>
            ))}
          </div>

          <section id={sectionId("equipment")} className="guide-section">
            <h2>Equipment · {profile.name}</h2>
            <Html html={buildData.widgetNotes.equipment} />
            <div className="guide-table-wrap mt-6">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Item</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.equipment.map((item: any, i: number) => (
                    <tr key={i}>
                      <td>{item.slot}</td>
                      <td>{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id={sectionId("skills")} className="guide-section">
            <h2>Skills · {profile.name}</h2>
            <Html html={buildData.widgetNotes.skills} />
            <div className="guide-skills mt-6">
              {profile.skills.map((group: any, i: number) => (
                <SkillGroup key={i} group={group} />
              ))}
            </div>
          </section>

          <section id={sectionId("rotation")} className="guide-section">
            <h2>Rotation</h2>
            <Html html={buildData.widgetNotes.skillRotations} />
            {profile.skillRotations?.map((rotation: any, i: number) => (
              <div key={i} className="rotation-card">
                <h3>{rotation.name}</h3>
                <Html html={rotation.html} />
              </div>
            ))}
          </section>

          <section id={sectionId("passive-skill-tree")} className="guide-section">
            <h2>Passive Skill Tree · {profile.name}</h2>
            <Html html={buildData.widgetNotes.passives} />
            <div className="guide-placeholder">
              Passive tree data is available in the Maxroll Planner:
              <br />
              <a
                href={buildData.plannerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {buildData.plannerLink}
              </a>
            </div>
          </section>

          <section id={sectionId("ascendancy")} className="guide-section">
            <h2>Ascendancy</h2>
            <Html html={buildData.widgetNotes.ascendancy} />
            <div className="guide-tree mt-6">
              <div>
                <h3>Class</h3>
                <p>{profile.ascendancy}</p>
              </div>
            </div>
          </section>

          <section id={sectionId("pantheon-and-bandits")} className="guide-section">
            <h2>Pantheon and Bandits</h2>
            <div className="guide-tree">
              <div>
                <h3>Major God</h3>
                <p>{pantheonMajor || "—"}</p>
              </div>
              <div>
                <h3>Minor God</h3>
                <p>{pantheonMinor || "—"}</p>
              </div>
              <div>
                <h3>Bandits</h3>
                <p>{profile.bandits}</p>
              </div>
            </div>
          </section>

          <section id={sectionId("path-of-building")} className="guide-section">
            <h2>Path of Building</h2>
            <p className="guide-body">
              The full planner profile is available on Maxroll. You can also
              check the official Path of Building Community fork for the latest
              import.
            </p>
            <div className="guide-links">
              <a
                href={buildData.plannerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="guide-link"
              >
                Open Maxroll Planner
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
              <a
                href="https://pathofbuilding.community/"
                target="_blank"
                rel="noopener noreferrer"
                className="guide-link"
              >
                Path of Building
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          </section>

          <footer className="guide-footer">
            <p>
              Content mirrored from{" "}
              <a
                href={`https://maxroll.gg/poe/build-guides/${buildData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Maxroll
              </a>
              . All game terminology and descriptions are kept in their original
              form.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
