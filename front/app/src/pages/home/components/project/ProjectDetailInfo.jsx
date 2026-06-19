import styled from "styled-components";

export default function ProjectDetailInfo({ project }) {
  const detail = project?.detail;

  if (!detail) {
    return null;
  }

  const infoList = detail.info ?? [];
  const serviceFeatureList = detail.serviceFeatures ?? detail.features ?? [];
  const myFeatureList = detail.myFeatures ?? detail.roles ?? [];
  const stackList = project?.stack ?? [];
  const linkList = project?.links ?? [];

  return (
    <BriefSection>
      <BriefHeader>
        <HeaderTextGroup>
          <SectionEyebrow>PROJECT BRIEF</SectionEyebrow>
          <SectionTitle>{project.title}</SectionTitle>
          <SectionSubtitle>{project.subtitle}</SectionSubtitle>
        </HeaderTextGroup>

        {linkList.length > 0 && (
          <HeaderLinkGroup>
            {linkList.map((link) => (
              <HeaderLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </HeaderLink>
            ))}
          </HeaderLinkGroup>
        )}
      </BriefHeader>

      <SummaryPanel>
        <SummaryLabel>SUMMARY</SummaryLabel>
        <SummaryText>{project.summary}</SummaryText>
      </SummaryPanel>

      {infoList.length > 0 && (
        <InfoGrid>
          {infoList.map((info) => (
            <InfoCard key={info.label}>
              <InfoLabel>{info.label}</InfoLabel>
              <InfoValue>{info.value}</InfoValue>
            </InfoCard>
          ))}
        </InfoGrid>
      )}

      {stackList.length > 0 && (
        <StackPanel>
          <PanelTitle>사용 기술 스택</PanelTitle>

          <StackList>
            {stackList.map((stack) => (
              <span key={stack}>{stack}</span>
            ))}
          </StackList>
        </StackPanel>
      )}

      <FeatureGrid>
        {serviceFeatureList.length > 0 && (
          <FeatureCard>
            <FeatureHeader>
              <FeatureNumber>01</FeatureNumber>
              <FeatureTitle>서비스 전체 기능</FeatureTitle>
            </FeatureHeader>

            <FeatureList>
              {serviceFeatureList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </FeatureList>
          </FeatureCard>
        )}

        {myFeatureList.length > 0 && (
          <FeatureCard $emphasis>
            <FeatureHeader>
              <FeatureNumber>02</FeatureNumber>
              <FeatureTitle>내가 맡은 기능</FeatureTitle>
            </FeatureHeader>

            <FeatureList>
              {myFeatureList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </FeatureList>
          </FeatureCard>
        )}
      </FeatureGrid>
    </BriefSection>
  );
}

const BriefSection = styled.section`
  position: relative;
  margin-top: 46px;
  padding: clamp(24px, 3vw, 34px);

  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(229, 224, 223, 0.1);

  background:
    radial-gradient(
      circle at 8% 0%,
      rgba(202, 178, 168, 0.14),
      transparent 32%
    ),
    radial-gradient(
      circle at 92% 100%,
      rgba(116, 130, 189, 0.16),
      transparent 34%
    ),
    linear-gradient(
      135deg,
      rgba(229, 224, 223, 0.045),
      rgba(229, 224, 223, 0.018)
    );

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.025),
    0 34px 90px rgba(0, 0, 0, 0.22);

  &::before {
    content: "BRIEF";
    position: absolute;
    right: clamp(18px, 3vw, 34px);
    top: 18px;

    color: rgba(229, 224, 223, 0.035);
    font-size: clamp(58px, 8vw, 116px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.08em;
    pointer-events: none;
  }
`;

const BriefHeader = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const HeaderTextGroup = styled.div`
  min-width: 0;
`;

const SectionEyebrow = styled.p`
  margin: 0 0 10px;

  color: var(--portfolio-rose-beige);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
`;

const SectionTitle = styled.h4`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: clamp(30px, 3vw, 48px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.065em;
`;

const SectionSubtitle = styled.p`
  margin: 12px 0 0;

  color: var(--portfolio-text-sub);
  font-size: clamp(15px, 1vw, 18px);
  font-weight: 300;
  line-height: 1.65;
  letter-spacing: -0.035em;
`;

const HeaderLinkGroup = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 720px) {
    justify-content: flex-start;
  }
`;

const HeaderLink = styled.a`
  height: 36px;
  padding: 0 15px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  border: 1px solid rgba(202, 178, 168, 0.24);
  background-color: rgba(202, 178, 168, 0.075);

  color: var(--portfolio-rose-beige);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    color: var(--portfolio-white-soft);
    border-color: rgba(202, 178, 168, 0.5);
    background-color: rgba(202, 178, 168, 0.14);
    transform: translateY(-2px);
  }
`;

const SummaryPanel = styled.div`
  position: relative;
  z-index: 1;

  margin-top: 28px;
  padding: 20px 22px;

  border-radius: 22px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  background: linear-gradient(
    135deg,
    rgba(9, 10, 16, 0.34),
    rgba(9, 10, 16, 0.12)
  );

  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SummaryLabel = styled.span`
  color: var(--portfolio-rose-beige);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
`;

const SummaryText = styled.p`
  margin: 0;

  color: var(--portfolio-text-sub);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.85;
  letter-spacing: -0.035em;
`;

const InfoGrid = styled.div`
  position: relative;
  z-index: 1;

  margin-top: 18px;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  min-height: 92px;
  padding: 18px;

  border-radius: 20px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  background: linear-gradient(
    145deg,
    rgba(229, 224, 223, 0.06),
    rgba(229, 224, 223, 0.022)
  );

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoLabel = styled.span`
  color: var(--portfolio-text-muted);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.025em;
`;

const InfoValue = styled.strong`
  margin-top: 14px;

  color: var(--portfolio-white-soft);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.04em;
`;

const StackPanel = styled.div`
  position: relative;
  z-index: 1;

  margin-top: 24px;
`;

const PanelTitle = styled.h5`
  margin: 0 0 14px;

  color: var(--portfolio-rose-beige);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    min-height: 30px;
    padding: 0 12px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;
    background-color: rgba(116, 130, 189, 0.14);
    border: 1px solid rgba(116, 130, 189, 0.2);

    color: var(--portfolio-text-sub);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
`;

const FeatureGrid = styled.div`
  position: relative;
  z-index: 1;

  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 16px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 22px;

  border-radius: 24px;
  border: 1px solid
    ${({ $emphasis }) =>
      $emphasis ? "rgba(202, 178, 168, 0.22)" : "rgba(229, 224, 223, 0.1)"};

  background: ${({ $emphasis }) =>
    $emphasis
      ? `linear-gradient(
          135deg,
          rgba(202, 178, 168, 0.095),
          rgba(229, 224, 223, 0.025)
        )`
      : `rgba(229, 224, 223, 0.035)`};
`;

const FeatureHeader = styled.div`
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const FeatureNumber = styled.span`
  width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: rgba(202, 178, 168, 0.12);
  border: 1px solid rgba(202, 178, 168, 0.18);

  color: var(--portfolio-rose-beige);
  font-size: 11px;
  font-weight: 800;
`;

const FeatureTitle = styled.h5`
  margin: 0;

  color: var(--portfolio-white-soft);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.035em;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 10px;

  li {
    position: relative;
    padding-left: 16px;

    color: var(--portfolio-text-sub);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
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
    background-color: rgba(202, 178, 168, 0.75);
  }
`;
