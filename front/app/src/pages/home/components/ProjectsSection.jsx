import { useState } from "react";
import styled from "styled-components";

import { projects } from "./project/projectsData";
import ProjectModal from "./project/ProjectModal";
import ProjectCard from "./project/ProjectCard";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  function openModal(project) {
    setSelectedProject(project);
  }

  function closeModal() {
    setSelectedProject(null);
  }

  return (
    <Wrapper id="projects" className="portfolio-section">
      <Inner>
        <SectionHeader>
          <SectionLabel>PROJECTS</SectionLabel>

          <Title>프로젝트 포트폴리오</Title>

          <Description>
            단순히 화면을 구현하는 것에서 끝나지 않고, 사용자의 흐름과 데이터의
            이동 과정을 함께 고민하며 완성한 프로젝트들을 정리했습니다.
          </Description>
        </SectionHeader>

        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={openModal}
            />
          ))}
        </ProjectGrid>
      </Inner>

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 130px clamp(28px, 6vw, 110px) 120px;
  color: var(--portfolio-text-main);
  overflow: hidden;

  background:
    radial-gradient(
      circle at 18% 16%,
      rgba(116, 130, 189, 0.2),
      transparent 28%
    ),
    radial-gradient(
      circle at 78% 82%,
      rgba(202, 178, 168, 0.1),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #171421 0%,
      var(--portfolio-navy-black) 46%,
      #101727 100%
    );

  &::before {
    content: "PROJECT";
    position: absolute;
    right: clamp(24px, 6vw, 110px);
    top: 92px;

    color: rgba(229, 224, 223, 0.035);
    font-size: clamp(80px, 13vw, 230px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.08em;
    pointer-events: none;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  max-width: 820px;
  margin-bottom: clamp(58px, 6vw, 92px);
`;

const SectionLabel = styled.p`
  margin: 0 0 24px;

  color: var(--portfolio-rose-beige);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.22em;
`;

const Title = styled.h2`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(46px, 5.4vw, 92px);
  font-weight: normal;
  line-height: 1.16;
  letter-spacing: -0.065em;
`;

const Description = styled.p`
  max-width: 740px;
  margin: 32px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(15px, 1vw, 18px);
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.035em;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(28px, 4vw, 58px);

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;
