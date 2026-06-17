import { useEffect } from "react";
import styled from "styled-components";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" onClick={onClose}>
          ×
        </CloseButton>

        <Hero>
          <Thumbnail $image={project.thumbnail}>
            {!project.thumbnail && (
              <ThumbnailFallback>
                <span>{project.type}</span>
                <strong>{project.colorText}</strong>
              </ThumbnailFallback>
            )}
          </Thumbnail>

          <Intro>
            <ProjectType>{project.type}</ProjectType>
            <ModalTitle>{project.title}</ModalTitle>
            <ModalSubtitle>{project.subtitle}</ModalSubtitle>

            <ProjectMeta>
              <span>{project.period}</span>
              <i />
              <span>{project.role}</span>
            </ProjectMeta>

            <LinkList>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </LinkList>
          </Intro>
        </Hero>

        <Section>
          <SectionTitle>프로젝트 개요</SectionTitle>
          <Paragraph>{project.detail.overview}</Paragraph>
        </Section>

        <Grid>
          <Section>
            <SectionTitle>담당 역할</SectionTitle>
            <List>
              {project.detail.roles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </Section>

          <Section>
            <SectionTitle>주요 기능</SectionTitle>
            <List>
              {project.detail.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </Section>
        </Grid>

        <Section>
          <SectionTitle>트러블슈팅 / 개선 경험</SectionTitle>
          <List>
            {project.detail.troubles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
        </Section>
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;

  padding: clamp(18px, 4vw, 56px);

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(9, 10, 16, 0.76);
  backdrop-filter: blur(18px);
`;

const Content = styled.article`
  position: relative;

  width: min(1120px, 100%);
  max-height: min(860px, 92vh);
  padding: clamp(24px, 3vw, 44px);

  overflow-y: auto;

  border-radius: 32px;
  background:
    radial-gradient(
      circle at 18% 0%,
      rgba(116, 130, 189, 0.2),
      transparent 30%
    ),
    linear-gradient(135deg, rgba(29, 33, 38, 0.98), rgba(16, 23, 39, 0.98));

  border: 1px solid rgba(229, 224, 223, 0.12);
  box-shadow: 0 50px 140px rgba(0, 0, 0, 0.54);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.18);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 2;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: rgba(229, 224, 223, 0.08);
  color: var(--portfolio-white-soft);

  font-size: 28px;
  font-weight: 300;
  line-height: 1;

  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background-color: rgba(202, 178, 168, 0.18);
    transform: rotate(90deg);
  }
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
  gap: clamp(24px, 4vw, 54px);
  align-items: center;

  margin-bottom: 42px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Thumbnail = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 10;
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

const Intro = styled.div`
  padding-right: 42px;

  @media (max-width: 860px) {
    padding-right: 0;
  }
`;

const ProjectType = styled.p`
  margin: 0 0 12px;

  color: var(--portfolio-rose-beige);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

const ModalTitle = styled.h3`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: clamp(34px, 3.4vw, 58px);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.065em;
`;

const ModalSubtitle = styled.p`
  margin: 16px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(16px, 1.1vw, 20px);
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: -0.035em;
`;

const ProjectMeta = styled.div`
  margin-top: 14px;

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

const LinkList = styled.div`
  margin-top: 28px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  a {
    height: 36px;
    padding: 0 15px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.08);
    border: 1px solid rgba(229, 224, 223, 0.08);

    color: var(--portfolio-white-soft);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.02em;

    transition:
      background-color 0.18s ease,
      transform 0.18s ease;
  }

  a:hover {
    background-color: rgba(116, 130, 189, 0.18);
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  margin-top: 34px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 16px;

  color: var(--portfolio-rose-beige);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.12em;
`;

const Paragraph = styled.p`
  margin: 0;

  color: var(--portfolio-text-sub);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.035em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 10px;

  li {
    position: relative;
    padding-left: 18px;

    color: var(--portfolio-text-sub);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    letter-spacing: -0.035em;
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;

    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--portfolio-rose-beige);
  }
`;
