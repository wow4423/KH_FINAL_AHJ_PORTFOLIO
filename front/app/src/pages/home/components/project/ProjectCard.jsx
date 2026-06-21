import styled, { css, keyframes } from "styled-components";

export default function ProjectCard({ project, onClick, featured = false, index = 0 }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Card onClick={() => onClick(project)} $featured={featured}>
      <Thumbnail>
        <ThumbnailInner $image={project.thumbnail} $featured={featured}>
          {!project.thumbnail && (
            <ThumbnailFallback>
              <span>{project.type}</span>
              <strong>{project.colorText}</strong>
            </ThumbnailFallback>
          )}
        </ThumbnailInner>

        <ThumbnailOverlay />

        {featured && <FeaturedBadge>FEATURED</FeaturedBadge>}
      </Thumbnail>

      <ProjectBody>
        <ProjectIndex>{num}</ProjectIndex>

        <ProjectTitle>{project.title}</ProjectTitle>

        <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>

        <ProjectMeta>
          <span>{project.period}</span>
          <Dot />
          <span>{project.role}</span>
        </ProjectMeta>

        <ProjectActions>
          {project.links
            ?.filter((l) => l.href && l.href !== "#")
            .map((link) => (
              <ProjectLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {link.label}
              </ProjectLink>
            ))}

          <DetailButton type="button">
            <span>자세히 보기</span>
            <Arrow>→</Arrow>
          </DetailButton>
        </ProjectActions>

        <StackList>
          {project.stack.map((s) => (
            <StackTag key={s}>{s}</StackTag>
          ))}
        </StackList>
      </ProjectBody>
    </Card>
  );
}

/* ── Card ── */
const Card = styled.article`
  cursor: pointer;
  position: relative;
  display: grid;
  grid-template-columns: minmax(260px, 0.58fr) minmax(0, 1.42fr);
  gap: clamp(24px, 4vw, 52px);
  align-items: center;
  padding: 40px 0 44px;

  /* warm radial glow on hover (behind everything) */
  &::before {
    content: "";
    position: absolute;
    inset: -12px -20px;
    border-radius: 28px;
    background: radial-gradient(
      ellipse at 28% 55%,
      rgba(202, 178, 168, 0.09) 0%,
      rgba(116, 130, 189, 0.05) 45%,
      transparent 72%
    );
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.45s ease;
    z-index: 0;
  }

  /* separator line */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(229, 224, 223, 0.08) 20%,
      rgba(229, 224, 223, 0.08) 80%,
      transparent 100%
    );
  }

  ${({ $featured }) =>
    $featured &&
    css`
      /* top separator for featured card */
      padding-top: 0;
      &::before {
        inset: -12px -20px;
      }
    `}

  &:hover {
    transform: translateY(-5px);
  }

  &:hover::before {
    opacity: 1;
  }

  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Thumbnail ── */
const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 18px;
  z-index: 1;

  border: 1px solid rgba(229, 224, 223, 0.07);
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.32),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025);

  transition:
    box-shadow 0.42s ease,
    border-color 0.42s ease;

  ${Card}:hover & {
    box-shadow:
      0 40px 80px rgba(0, 0, 0, 0.48),
      0 0 0 1px rgba(202, 178, 168, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    border-color: rgba(202, 178, 168, 0.14);
  }
`;

const ThumbnailInner = styled.div`
  position: absolute;
  inset: 0;

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

  transform: scale(1);
  transition: transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 17, 28, 0.02) 0%,
    rgba(13, 17, 28, 0.12) 55%,
    rgba(13, 17, 28, 0.62) 100%
  );
  transition: background 0.42s ease;

  ${Card}:hover & {
    background: linear-gradient(
      180deg,
      rgba(13, 17, 28, 0.0) 0%,
      rgba(24, 14, 10, 0.14) 55%,
      rgba(30, 18, 12, 0.68) 100%
    );
  }
`;

const ThumbnailFallback = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  span {
    margin-bottom: 8px;
    color: var(--portfolio-rose-beige);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  strong {
    color: rgba(229, 224, 223, 0.88);
    font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
    font-size: clamp(52px, 5.5vw, 100px);
    font-weight: normal;
    line-height: 0.9;
    letter-spacing: -0.08em;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;

  height: 22px;
  padding: 0 9px;

  display: inline-flex;
  align-items: center;

  border-radius: 999px;
  background: rgba(202, 178, 168, 0.14);
  border: 1px solid rgba(202, 178, 168, 0.32);
  backdrop-filter: blur(6px);

  color: var(--portfolio-rose-beige);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

/* ── Body ── */
const ProjectBody = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 4px;
`;

const ProjectIndex = styled.span`
  display: block;
  margin-bottom: 14px;

  color: rgba(202, 178, 168, 0.32);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;

  transition: color 0.28s ease;

  ${Card}:hover & {
    color: rgba(202, 178, 168, 0.65);
  }
`;

const ProjectTitle = styled.h3`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: clamp(22px, 1.65vw, 30px);
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.055em;
`;

const ProjectSubtitle = styled.p`
  margin: 10px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(13px, 0.9vw, 15px);
  font-weight: 300;
  line-height: 1.82;
  letter-spacing: -0.025em;
`;

const ProjectMeta = styled.div`
  margin-top: 16px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  color: var(--portfolio-text-muted);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

const Dot = styled.i`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(202, 178, 168, 0.45);
  flex-shrink: 0;
`;

/* ── Actions ── */
const ProjectActions = styled.div`
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const ProjectLink = styled.a`
  height: 32px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;

  border-radius: 999px;
  border: 1px solid rgba(202, 178, 168, 0.25);
  background: rgba(202, 178, 168, 0.06);

  color: var(--portfolio-rose-beige);
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-decoration: none;

  transition:
    background 0.22s ease,
    border-color 0.22s ease,
    transform 0.22s ease,
    color 0.22s ease;

  &:hover {
    color: #fff;
    border-color: rgba(202, 178, 168, 0.65);
    background: rgba(202, 178, 168, 0.14);
    transform: translateY(-2px);
  }
`;

const arrowSlide = keyframes`
  from { transform: translateX(0); opacity: 1; }
  50%  { transform: translateX(5px); opacity: 0; }
  51%  { transform: translateX(-5px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

const Arrow = styled.span`
  margin-left: 6px;
  display: inline-block;
  transition: transform 0.22s ease;
`;

const DetailButton = styled.button`
  height: 32px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;

  border-radius: 999px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  background: transparent;

  color: rgba(229, 224, 223, 0.42);
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 400;
  letter-spacing: -0.01em;
  cursor: pointer;

  transition:
    color 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease,
    transform 0.22s ease;

  &:hover {
    color: rgba(229, 224, 223, 0.88);
    border-color: rgba(229, 224, 223, 0.22);
    background: rgba(229, 224, 223, 0.06);
    transform: translateY(-2px);
  }

  &:hover ${Arrow} {
    transform: translateX(4px);
  }
`;

/* ── Stacks ── */
const StackList = styled.div`
  margin-top: 18px;

  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const StackTag = styled.span`
  height: 24px;
  padding: 0 10px;

  display: inline-flex;
  align-items: center;

  border-radius: 999px;
  background: rgba(229, 224, 223, 0.055);
  border: 1px solid rgba(229, 224, 223, 0.055);

  color: rgba(229, 224, 223, 0.38);
  font-size: 10.5px;
  font-weight: 300;
  letter-spacing: -0.015em;

  transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;

  ${Card}:hover & {
    background: rgba(229, 224, 223, 0.075);
    border-color: rgba(229, 224, 223, 0.09);
    color: rgba(229, 224, 223, 0.52);
  }
`;
