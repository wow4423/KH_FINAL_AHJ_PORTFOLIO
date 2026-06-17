import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../../assets/images/배경제거포폴홈로고.png";

const headerMenus = [
  { label: "INTRO", section: "intro" },
  { label: "ABOUT", section: "about" },
  { label: "STACKS", section: "stacks" },
  { label: "PROJECTS", section: "projects" },
  { label: "CONTACT", section: "contact" },
];

export default function Header({ activeSection = "intro" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const currentSection = searchParams.get("section") || activeSection;

  function handleMoveSection(section) {
    navigate(`/home?section=${section}`);

    setTimeout(() => {
      const target = document.getElementById(section);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  }

  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <Link to="/home?section=intro" className="portfolio-logo">
          <img src={logoImg} alt="AHN HAN JUN 로고" />
        </Link>

        <nav className="portfolio-nav" aria-label="포트폴리오 메뉴">
          {headerMenus.map((menu) => (
            <button
              type="button"
              key={menu.section}
              className={
                currentSection === menu.section
                  ? "portfolio-nav-button active"
                  : "portfolio-nav-button"
              }
              onClick={() => handleMoveSection(menu.section)}
            >
              {menu.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
