import { useEffect, useRef } from "react";
import { Row } from "./Row";

interface Link {
  idx: string;
  name: string;
  en: string;
  desc: string;
  href: string;
}

interface SectionProps {
  id: string;
  no: string;
  title: string;
  en: string;
  desc: string;
  links: Link[];
}

export function Section({ id, no, title, en, desc, links }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    section.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section className="block" id={id} ref={sectionRef}>
      <div className="block-label reveal">
        <span className="no">SECTION · {no}</span>
        <h2>{title}</h2>
        <div className="en">{en}</div>
        <p>{desc}</p>
      </div>
      <div className="rows reveal">
        {links.map((link) => (
          <Row key={link.idx} {...link} />
        ))}
      </div>
    </section>
  );
}
