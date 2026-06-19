import styled from "styled-components";

export default function ProjectCard({ project, onClick }) {
  function handleCardClick() {
    onClick(project);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
  }

  return (
    <Card onClick={handleCardClick}>
      <Thumbnail $image={project.thumbnail}>
        {!project.thumbnail && (
          <ThumbnailFallback>
            <span>{project.type}</span>
            <strong>{project.colorText}</strong>
          </ThumbnailFallback>
        )}
      </Thumbnail>

      <ProjectBody>
        <ProjectTitle>{project.title}</ProjectTitle>

        <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>

        <ProjectMeta>
          <span>{project.period}</span>
          <i />
          <span>{project.role}</span>
        </ProjectMeta>

        <ProjectLinkList>
          {project.links?.map((link) => (
            <ProjectLink
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
            >
              {link.label}
            </ProjectLink>
          ))}

          <DetailButton type="button">자세히 보기</DetailButton>
        </ProjectLinkList>

        <StackList>
          {project.stack.map((stack) => (
            <span key={stack}>{stack}</span>
          ))}
        </StackList>
      </ProjectBody>
    </Card>
  );
}

const Card = styled.article`
  cursor: pointer;
  display: grid;
  gap: 26px;

  transition:
    transform 0.24s ease,
    opacity 0.24s ease;

  &:hover {
    transform: translateY(-8px);
  }

  &:hover ${"" /* 링크 hover와 충돌 방지용으로 별도 처리 */} {
  }
`;

const Thumbnail = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 24px;

  background: ${({ $image }) =>
    $image
      ? `url(${$image})`
      : `linear-gradient(
          135deg,
          rgba(37, 64, 122, 0.76),
          rgba(116, 130, 189, 0.28)
        )`};

  background-size: cover;
  background-position: center;

  border: 1px solid rgba(229, 224, 223, 0.09);
  box-shadow:
    0 34px 80px rgba(0, 0, 0, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.035);

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        180deg,
        rgba(13, 17, 28, 0.02) 0%,
        rgba(13, 17, 28, 0.18) 58%,
        rgba(13, 17, 28, 0.72) 100%
      ),
      radial-gradient(
        circle at 70% 24%,
        rgba(202, 178, 168, 0.18),
        transparent 24%
      );
  }
`;

const ThumbnailFallback = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
  padding: 34px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  span {
    margin-bottom: 10px;
    color: var(--portfolio-rose-beige);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  strong {
    color: rgba(229, 224, 223, 0.92);
    font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
    font-size: clamp(66px, 7vw, 118px);
    font-weight: normal;
    line-height: 0.9;
    letter-spacing: -0.08em;
  }
`;

const ProjectBody = styled.div`
  padding: 0 4px;
`;

const ProjectTitle = styled.h3`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: clamp(28px, 2vw, 40px);
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.06em;
`;

const ProjectSubtitle = styled.p`
  margin: 12px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(15px, 1vw, 17px);
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: -0.035em;
`;

const ProjectMeta = styled.div`
  margin-top: 16px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;

  color: var(--portfolio-text-muted);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.02em;

  i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: rgba(202, 178, 168, 0.65);
  }
`;

const ProjectSummary = styled.p`
  margin: 20px 0 0;

  color: var(--portfolio-text-sub);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.85;
  letter-spacing: -0.035em;
`;

const ProjectLinkList = styled.div`
  margin-top: 24px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const ProjectLink = styled.a`
  height: 36px;
  padding: 0 16px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  border: 1px solid rgba(202, 178, 168, 0.35);
  background-color: rgba(202, 178, 168, 0.08);

  color: var(--portfolio-rose-beige);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.025em;
  text-decoration: none;

  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    color: var(--portfolio-white-soft);
    border-color: rgba(202, 178, 168, 0.75);
    background-color: rgba(202, 178, 168, 0.16);
    transform: translateY(-2px);
  }
`;

const DetailButton = styled.button`
  height: 36px;
  padding: 0 16px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  border: 1px solid rgba(229, 224, 223, 0.12);
  background-color: rgba(229, 224, 223, 0.06);

  color: var(--portfolio-text-sub);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.025em;

  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &::after {
    content: "›";
    margin-left: 8px;
    color: var(--portfolio-rose-beige);
  }

  &:hover {
    color: var(--portfolio-white-soft);
    border-color: rgba(229, 224, 223, 0.22);
    background-color: rgba(229, 224, 223, 0.1);
    transform: translateY(-2px);
  }
`;

const StackList = styled.div`
  margin-top: 22px;

  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    height: 28px;
    padding: 0 11px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.07);
    border: 1px solid rgba(229, 224, 223, 0.07);

    color: var(--portfolio-text-sub);
    font-size: 12px;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
`;
