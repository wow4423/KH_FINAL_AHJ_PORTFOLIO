import "./Header.css";
import { useEffect, useState } from "react";
import logoImg from "../../../assets/images/배경제거포폴홈로고.png";

const headerMenus = [
  { label: "INTRO", section: "intro" },
  { label: "ABOUT", section: "about" },
  { label: "STACKS", section: "stacks" },
  { label: "PROJECTS", section: "projects" },
];

const allSections = ["intro", "about", "stacks", "projects", "contact", "guestbook"];

export default function Header() {
  const [currentSection, setCurrentSection] = useState(
    () => new URLSearchParams(window.location.search).get("section") || "intro"
  );

  useEffect(() => {
    const observers = [];

    allSections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
            window.history.replaceState(
              null,
              "",
              window.location.pathname + `?section=${id}`
            );
          }
        },
        {
          threshold: 0.35,
          rootMargin: `-72px 0px -25% 0px`,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollToSection(section) {
    const target = document.getElementById(section);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentSection(section);
    window.history.pushState(
      null,
      "",
      window.location.pathname + `?section=${section}`
    );
  }

  function handleLogoClick(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentSection("intro");
    window.history.pushState(null, "", window.location.pathname + "?section=intro");
  }

  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a href="#" className="portfolio-logo" onClick={handleLogoClick}>
          <img src={logoImg} alt="AHN HAN JUN 로고" />
        </a>

        <nav className="portfolio-nav" aria-label="포트폴리오 메뉴">
          {headerMenus.map((menu) => (
            <button
              type="button"
              key={menu.section}
              className={`portfolio-nav-button${
                currentSection === menu.section ? " active" : ""
              }`}
              onClick={() => scrollToSection(menu.section)}
            >
              {menu.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
