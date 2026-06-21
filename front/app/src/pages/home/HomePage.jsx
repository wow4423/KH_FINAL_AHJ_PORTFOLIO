import "./HomePage.css";
import AboutSection from "./components/AboutSection";
import nightVideo from "../../assets/images/달밤영상.mp4";
import StacksSection from "./components/StacksSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import GuestbookSection from "./components/GuestbookSection";

export default function HomePage() {
  return (
    <div className="portfolio-page">
      <section id="intro" className="portfolio-section intro-section">
        <video
          className="intro-bg-video"
          src={nightVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        <div className="intro-bg-overlay" />

        <div className="portfolio-section-inner intro-content">
          <p className="intro-eyebrow">AHN HAN JUN · FULLSTACK WEB DEVELOPER</p>

          <h1 className="intro-title">
            알리던 사람이
            <br />
            만드는 사람이
            <br />
            됐습니다.
          </h1>

          <p className="intro-desc">
            B2B 기업에서 홍보기획을 하며 플랫폼 서비스를 기획하고 알렸습니다.
            <br />
            데이터와 기능이 하나로 연결되는 구조에 매료됐고,
            <br />
            그 흐름을 직접 설계하고 싶어 개발을 시작했습니다.
          </p>

          <div className="intro-career">
            <span className="career-tag">홍보기획</span>
            <span className="career-arrow">→</span>
            <span className="career-now">Fullstack Developer</span>
          </div>
        </div>
      </section>

      <AboutSection />

      <StacksSection />

      <ProjectsSection />

      <ContactSection />

      <GuestbookSection />
    </div>
  );
}
