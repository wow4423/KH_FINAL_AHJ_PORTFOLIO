import styled from "styled-components";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiGit,
  SiGithub,
  SiHibernate,
  SiJavascript,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiSpringsecurity,
  SiStyledcomponents,
} from "react-icons/si";

const stacks = [
  { name: "React", icon: SiReact, group: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, group: "Frontend" },
  { name: "Redux Toolkit", icon: SiRedux, group: "Frontend" },
  { name: "styled-components", icon: SiStyledcomponents, group: "Frontend" },
  { name: "Java", icon: FaJava, group: "Backend" },
  { name: "Spring Boot", icon: SiSpringboot, group: "Backend" },
  { name: "Spring Security", icon: SiSpringsecurity, group: "Backend" },
  { name: "JPA · Hibernate", icon: SiHibernate, group: "Backend" },
  { name: "PostgreSQL", icon: SiPostgresql, group: "Data" },
  { name: "AWS", icon: FaAws, group: "Infra" },
  { name: "Git", icon: SiGit, group: "Tools" },
  { name: "GitHub", icon: SiGithub, group: "Tools" },
];

export default function StacksSection() {
  return (
    <Wrapper id="stacks" className="portfolio-section">
      <Inner>
        <SectionHeader>
          <SectionLabel>TECH STACK</SectionLabel>
          <Title>주요 기술</Title>
        </SectionHeader>

        <StackList>
          {stacks.map((stack) => (
            <StackItem key={stack.name}>
              <StackIcon aria-hidden="true">
                <stack.icon />
              </StackIcon>
              <StackText>
                <strong>{stack.name}</strong>
                <span>{stack.group}</span>
              </StackText>
            </StackItem>
          ))}
        </StackList>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: auto;
  padding: 120px clamp(28px, 6vw, 110px);
  color: var(--portfolio-text-main);
  overflow: hidden;

  background:
    radial-gradient(
      circle at 18% 18%,
      rgba(116, 130, 189, 0.18),
      transparent 28%
    ),
    radial-gradient(
      circle at 82% 76%,
      rgba(202, 178, 168, 0.1),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #101727 0%,
      var(--portfolio-navy-black) 46%,
      #171421 100%
    );

  &::before {
    content: "";
    position: absolute;
    top: 120px;
    right: clamp(28px, 7vw, 130px);

    width: clamp(180px, 18vw, 340px);
    height: clamp(180px, 18vw, 340px);
    border-radius: 50%;

    border: 1px solid rgba(229, 224, 223, 0.08);
    background: rgba(116, 130, 189, 0.06);

    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: clamp(28px, 6vw, 110px);
    top: 260px;

    width: min(520px, 38vw);
    height: 1px;

    background: linear-gradient(
      90deg,
      rgba(202, 178, 168, 0.45),
      rgba(116, 130, 189, 0.16),
      transparent
    );

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
  margin-bottom: 34px;
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
  font-size: clamp(38px, 4vw, 62px);
  font-weight: normal;
  line-height: 1.16;
  letter-spacing: -0.065em;
`;

const StackList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StackItem = styled.div`
  min-height: 76px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.09);
`;

const StackIcon = styled.span`
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(202, 178, 168, 0.1);
  color: #d2b9b1;
  font-size: 20px;
`;

const StackText = styled.span`
  min-width: 0;
  display: grid;
  gap: 3px;

  strong {
    overflow: hidden;
    color: rgba(247, 244, 242, 0.88);
    font-size: 14px;
    font-weight: 650;
    letter-spacing: -0.025em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: rgba(247, 244, 242, 0.38);
    font-size: 11px;
    font-weight: 500;
  }
`;
