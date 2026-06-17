import "./Footer.css";
import { Link } from "react-router-dom";

/*
  포트폴리오용 하드코딩 Footer

  - 백엔드/로그인 상태 의존성 없음
  - 원래 파이널 프로젝트 푸터의 가로형 구조 유지
  - 연락처 영역은 포트폴리오 링크 영역으로 변경
*/
const footerMenus = [
  { label: "건강관리", icon: "▣", path: "/healthCare" },
  { label: "스토어", icon: "□", path: "/store" },
  { label: "커뮤니티", icon: "♧", path: "/community" },
  { label: "일정관리", icon: "♢", path: "/healthCare/schedule" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* 브랜드 정보 영역 */}
        <section className="footer-brand">
          <div className="footer-brand-title">
            <span className="footer-brand-icon">⌂</span>
            <strong>PET&amp;I FOR</strong>
          </div>

          <p>
            반려동물 건강관리, 커뮤니티, 스토어 기능을 담은
            <br />
            풀스택 파이널 프로젝트 포트폴리오입니다.
          </p>

          <small>© 2026 PET&amp;I FOR Portfolio. All rights reserved.</small>
        </section>

        {/* 서비스 소개 영역 */}
        <section className="footer-desc">
          <p>
            사용자의 반려동물 정보를 기반으로 건강관리 흐름을 설계하고,
            <br />
            커뮤니티와 스토어 기능을 함께 구성한 반려동물 통합 서비스입니다.
          </p>
        </section>

        {/* 중앙 바로가기 메뉴 영역 */}
        <nav className="footer-menu" aria-label="푸터 바로가기 메뉴">
          {footerMenus.map((menu) => (
            <Link to={menu.path} className="footer-menu-item" key={menu.label}>
              <span className="footer-menu-icon">{menu.icon}</span>
              <em>{menu.label}</em>
            </Link>
          ))}
        </nav>

        {/* 포트폴리오 정보 영역 */}
        <section className="footer-contact">
          <h3>Portfolio</h3>

          <ul className="footer-contact-list">
            <li className="footer-contact-email">
              <span className="footer-contact-icon">ⓘ</span>
              <p>React · Spring Boot · JPA · AWS</p>
            </li>

            <li>
              <span className="footer-contact-icon">›</span>
              <Link to="/portfolio">프로젝트 개요</Link>
            </li>

            <li>
              <span className="footer-contact-icon">›</span>
              <Link to="/portfolio#features">주요 기능</Link>
            </li>

            <li>
              <span className="footer-contact-icon">›</span>
              <Link to="/portfolio#troubleshooting">트러블슈팅</Link>
            </li>

            <li>
              <span className="footer-contact-icon">›</span>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="footer-social">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              G
            </a>
            <Link to="/portfolio" aria-label="Portfolio">
              P
            </Link>
            <Link to="/contact" aria-label="Contact">
              C
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}
