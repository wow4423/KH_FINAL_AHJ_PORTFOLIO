import styled from "styled-components";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiHibernate,
  SiJavascript,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiSpringsecurity,
  SiStyledcomponents,
} from "react-icons/si";

const stackGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "styled-components", icon: SiStyledcomponents },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Spring Security", icon: SiSpringsecurity },
      { name: "JPA · Hibernate", icon: SiHibernate },
    ],
  },
  {
    label: "Data · Infra",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "AWS", icon: FaAws },
    ],
  },
  {
    label: "Creative",
    items: [
      { name: "Premiere Pro", badge: "Pr" },
      { name: "After Effects", badge: "Ae" },
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
                    <StackIcon aria-hidden="true">
                      {stack.icon ? <stack.icon /> : <StackBadge>{stack.badge}</StackBadge>}
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
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: rgba(202, 178, 168, 0.09);
  color: #d2b9b1;
  font-size: 15px;
`;

const StackBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #d2b9b1;
`;

const StackName = styled.span`
  color: rgba(247, 244, 242, 0.8);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.02em;
`;
