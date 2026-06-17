import "./HomePage.css";
import AboutSection from "./components/AboutSection";
import nightVideo from "../../assets/images/달밤영상.mp4";
import StacksSection from "./components/StacksSection";
import ProjectsSection from "./components/ProjectsSection";

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
          <p className="intro-eyebrow">FULLSTACK WEB DEVELOPER PORTFOLIO</p>

          <h1 className="intro-title">
            안녕하세요.
            <br />
            흐름을 설계하는 개발자
            <br />
            한준 입니다.
          </h1>

          <p className="intro-desc">
            사용자 경험을 고려한 화면 구성과 데이터 흐름 설계를 바탕으로,
            서비스를 개발하는 풀스택 개발자입니다.
          </p>
        </div>
      </section>

      <AboutSection />

      <StacksSection />

      <ProjectsSection />

      <section id="contact" className="portfolio-section contact-section">
        <div className="portfolio-section-inner">
          <h2>CONTACT</h2>
          <p>이메일, GitHub, Notion 링크를 배치하는 영역입니다.</p>
        </div>
      </section>
    </div>
  );
}
