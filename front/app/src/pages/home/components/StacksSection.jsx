import styled from "styled-components";
import jsIcon from "../../../assets/images/stacklogo/JS.png";
import html5Icon from "../../../assets/images/stacklogo/HTML5.png";
import CSS35Icon from "../../../assets/images/stacklogo/CSS3.png";
import ReactIcon from "../../../assets/images/stacklogo/React.png";

import PremiereProIcon from "../../../assets/images/stacklogo/PremierePro.png";
import AfterEffectIcon from "../../../assets/images/stacklogo/AfterEffect.png";

const stackGroups = [
  {
    category: "Front-end",
    description: "사용자 화면 구성과 인터랙션 구현",
    stacks: [
      { name: "JavaScript", icon: jsIcon },
      { name: "HTML5", icon: html5Icon },
      { name: "CSS3", icon: CSS35Icon },
      { name: "React", icon: ReactIcon },
      { name: "jQuery" },
      { name: "Ajax" },
      { name: "Axios" },
      { name: "styled-components" },
      { name: "React Router" },
      { name: "Redux" },
    ],
  },
  {
    category: "Back-end",
    description: "API 설계와 서버 비즈니스 로직 구현",
    stacks: [
      { name: "Java" },
      { name: "JSP & Servlet" },
      { name: "Spring" },
      { name: "Spring Boot" },
      { name: "Spring Security" },
      { name: "Spring Data JPA" },
      { name: "JPA" },
      { name: "MyBatis" },
      { name: "JWT" },
      { name: "Lombok" },
    ],
  },
  {
    category: "Database",
    description: "데이터 모델링과 관계형 데이터 관리",
    stacks: [{ name: "Oracle" }, { name: "PostgreSQL" }],
  },
  {
    category: "Infra / Environment",
    description: "개발 및 배포 환경 구성",
    stacks: [
      { name: "Apache Tomcat" },
      { name: "AWS EC2" },
      { name: "AWS RDS" },
      { name: "AWS S3" },
    ],
  },
  {
    category: "Tools",
    description: "개발 생산성과 테스트를 위한 도구",
    stacks: [
      { name: "Eclipse" },
      { name: "Visual Studio Code" },
      { name: "IntelliJ IDEA" },
      { name: "Postman" },
      { name: "pgAdmin" },
      { name: "Figma" },
      { name: "ERD Cloud" },
      { name: "SourceTree" },
      { name: "PremierePro", icon: PremiereProIcon },
      { name: "AfterEffect", icon: AfterEffectIcon },
    ],
  },
  {
    category: "Collaboration",
    description: "팀 프로젝트 협업과 일정 관리",
    stacks: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Notion" },
      { name: "Trello" },
      { name: "Google Sheets" },
      { name: "KakaoTalk" },
      { name: "Jitsi Meet" },
    ],
  },
];

function getInitial(stackName) {
  const trimmedName = stackName.trim();

  if (trimmedName === "styled-components") {
    return "SC";
  }

  if (trimmedName === "Visual Studio Code") {
    return "VS";
  }

  if (trimmedName === "IntelliJ IDEA") {
    return "IJ";
  }

  if (trimmedName === "Spring Boot") {
    return "SB";
  }

  if (trimmedName === "Spring Security") {
    return "SS";
  }

  if (trimmedName === "Spring Data JPA") {
    return "JPA";
  }

  if (trimmedName === "Apache Tomcat") {
    return "TC";
  }

  if (trimmedName === "PostgreSQL") {
    return "PG";
  }

  if (trimmedName === "Google Sheets") {
    return "GS";
  }

  return trimmedName
    .split(/[\s&/-]+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function StacksSection() {
  return (
    <Wrapper id="stacks" className="portfolio-section">
      <Inner>
        <SectionHeader>
          <SectionLabel>STACKS</SectionLabel>

          <Title>주요기술 스택</Title>

          <Description>아래의 기술을 사용할 수 있습니다.</Description>
        </SectionHeader>

        <StackGrid>
          {stackGroups.map((group) => (
            <StackCard key={group.category}>
              <CardHeader>
                <CardTitle>{group.category}</CardTitle>
                <CardDesc>{group.description}</CardDesc>
              </CardHeader>

              <LogoGrid>
                {group.stacks.map((stack) => (
                  <LogoItem key={stack.name}>
                    <LogoBox>
                      {stack.icon ? (
                        <img src={stack.icon} alt={`${stack.name} 로고`} />
                      ) : (
                        <InitialText>{getInitial(stack.name)}</InitialText>
                      )}
                    </LogoBox>

                    <StackName>{stack.name}</StackName>
                  </LogoItem>
                ))}
              </LogoGrid>
            </StackCard>
          ))}
        </StackGrid>
      </Inner>
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
  max-width: 720px;
  margin: 32px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(15px, 1vw, 18px);
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.035em;
`;

const StackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;

const StackCard = styled.article`
  position: relative;

  padding: clamp(26px, 2.2vw, 36px);
  min-height: 280px;

  border-radius: 28px;
  background: linear-gradient(
    135deg,
    rgba(229, 224, 223, 0.085) 0%,
    rgba(116, 130, 189, 0.055) 48%,
    rgba(29, 33, 38, 0.28) 100%
  );
  border: 1px solid rgba(229, 224, 223, 0.09);
  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(16px);

  overflow: hidden;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    top: -90px;
    right: -90px;

    width: 180px;
    height: 180px;
    border-radius: 50%;

    background: rgba(116, 130, 189, 0.12);
    filter: blur(2px);

    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(202, 178, 168, 0.22);
  }

  &:hover::before {
    transform: scale(1.18);
  }
`;

const CardHeader = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  margin-bottom: 28px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CardTitle = styled.h3`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: clamp(22px, 1.5vw, 30px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.045em;
`;

const CardDesc = styled.p`
  max-width: 300px;
  margin: 0;

  color: var(--portfolio-text-muted);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.025em;

  text-align: right;

  @media (max-width: 640px) {
    max-width: none;
    text-align: left;
  }
`;

const LogoGrid = styled.div`
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: 18px 14px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
    gap: 16px 10px;
  }
`;

const LogoItem = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  text-align: center;
`;

const LogoBox = styled.div`
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;
  background:
    radial-gradient(
      circle at 32% 22%,
      rgba(255, 255, 255, 0.16),
      transparent 32%
    ),
    rgba(229, 224, 223, 0.075);

  border: 1px solid rgba(229, 224, 223, 0.09);
  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025);

  overflow: hidden;

  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;

  img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  ${LogoItem}:hover & {
    transform: translateY(-4px);
    background-color: rgba(116, 130, 189, 0.16);
    border-color: rgba(202, 178, 168, 0.2);
  }

  @media (max-width: 520px) {
    width: 52px;
    height: 52px;
    border-radius: 16px;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const InitialText = styled.span`
  color: var(--portfolio-white-soft);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const StackName = styled.p`
  max-width: 92px;
  margin: 0;

  color: var(--portfolio-text-sub);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.35;
  letter-spacing: -0.035em;

  word-break: keep-all;
`;
