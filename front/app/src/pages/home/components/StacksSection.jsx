import styled from "styled-components";
import { FaAws, FaJava, FaServer, FaDatabase } from "react-icons/fa";
import {
  SiHibernate,
  SiJavascript,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiSpringsecurity,
  SiStyledcomponents,
  SiHtml5,
  SiGit,
  SiGithub,
  SiIntellijidea,
  SiGradle,
} from "react-icons/si";

const stackGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#A78BFA" },
      { name: "styled-components", icon: SiStyledcomponents, color: "#E879B9" },
      { name: "HTML5 · CSS3", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Spring Security", icon: SiSpringsecurity, color: "#6DB33F" },
      { name: "JPA · Hibernate", icon: SiHibernate, color: "#BCAE79" },
      { name: "MyBatis", badge: "MB", color: "#D98A6A" },
    ],
  },
  {
    label: "Data · Cloud",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#7BA7E8" },
      { name: "Oracle", icon: FaDatabase, color: "#E66A5A" },
      { name: "AWS EC2", icon: FaServer, color: "#FF9900" },
      { name: "AWS RDS", icon: FaDatabase, color: "#5C8DFF" },
      { name: "AWS S3", icon: FaAws, color: "#FF9900" },
    ],
  },
  {
    label: "Tools · Creative",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#D6D2DE" },
      { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#C792EA" },
      { name: "Gradle", icon: SiGradle, color: "#8FBCC8" },
      { name: "Premiere Pro · After Effects", badge: "Pr", color: "#A6A0FF" },
    ],
  },
];

export default function StacksSection() {
  return (
    <Wrapper id="stacks" className="portfolio-section">
      <Inner>
        <SectionHeader>
          <SectionLabel>TECH STACK</SectionLabel>
          <Title>주요 기술</Title>
        </SectionHeader>

        <GroupGrid>
          {stackGroups.map((group) => (
            <Group key={group.label}>
              <GroupLabel>{group.label}</GroupLabel>
              <ItemList>
                {group.items.map((stack) => (
                  <StackItem key={stack.name}>
                    <StackIcon aria-hidden="true" $color={stack.color}>
                      {stack.icon ? (
                        <stack.icon />
                      ) : (
                        <StackBadge $color={stack.color}>{stack.badge}</StackBadge>
                      )}
                    </StackIcon>
                    <StackName>{stack.name}</StackName>
                  </StackItem>
                ))}
              </ItemList>
            </Group>
          ))}
        </GroupGrid>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: auto;
  padding: 110px clamp(28px, 6vw, 110px) 60px;
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
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 44px;
`;

const SectionLabel = styled.p`
  margin: 0 0 18px;
  color: var(--portfolio-rose-beige);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2em;
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

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 2vw, 24px);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Group = styled.div`
  padding: 24px 20px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const GroupLabel = styled.p`
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--portfolio-rose-beige);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const ItemList = styled.div`
  display: grid;
  gap: 7px;
`;

const StackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: rgba(202, 178, 168, 0.08);
    border-color: rgba(202, 178, 168, 0.14);
  }
`;

const StackIcon = styled.span`
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: ${({ $color }) => $color || "#d2b9b1"};
  font-size: 17px;
`;

const StackBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ $color }) => $color || "#d2b9b1"};
`;

const StackName = styled.span`
  color: rgba(247, 244, 242, 0.8);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.02em;
`;
