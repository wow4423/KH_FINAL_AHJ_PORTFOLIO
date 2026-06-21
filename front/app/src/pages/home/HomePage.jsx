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
            보이지 않던 흐름을
            <br />
            끝까지 따라가
            <br />
            분명하게 만듭니다.
          </h1>

          <p className="intro-desc">
            사용자가 자연스럽게 움직이는 화면과
            <br />
            시간이 지나도 믿을 수 있는 데이터를 설계하는 개발자 안한준입니다.
          </p>

          <div className="intro-signature">
            <span>UI FLOW</span>
            <i />
            <span>DATA FLOW</span>
            <i />
            <span>SERVICE LOGIC</span>
          </div>
        </div>
      </section>

      <AboutSection />

      <StacksSection />

      <ProjectsSection />
    </div>
  );
}
