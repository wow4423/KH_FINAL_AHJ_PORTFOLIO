import styled from "styled-components";
import { useRef } from "react";
import moonImg from "../../../assets/images/달사진.jpg";

const career = [
  {
    period: "2014.03 – 2021.02",
    tag: "EDUCATION",
    title: "서경대학교",
    sub: "글로벌경영학과",
  },
  {
    period: "2018.01 – 2018.07",
    tag: "WORK",
    title: "군종행정 부사관",
    sub: "3기갑여단",
  },
  {
    period: "2020.12 – 2025.07",
    tag: "WORK",
    title: "이트너스",
    sub: "홍보기획팀 · B2B 서비스 기획·홍보",
  },
  {
    period: "2025.11 – 2026.06",
    tag: "EDUCATION",
    title: "KH정보교육원",
    sub: "AWS 클라우드 기반 DevOps 개발자 양성 과정",
  },
];

const profileItems = [
  { label: "Name", value: "안한준 (Ahn Han Jun)" },
  { label: "Role", value: "Fullstack Web Developer" },
  { label: "Background", value: "홍보기획 → 풀스택 개발 전향" },
  { label: "Email", value: "wow4423@gmail.com" },
];

export default function AboutSection() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  function onMouseDown(e) {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }

  function onMouseMove(e) {
    if (!isDragging.current) return;
    e.preventDefault();
    trackRef.current.scrollLeft =
      scrollStart.current - (e.pageX - startX.current);
  }

  function stopDrag() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }

  return (
    <Wrapper id="about">
      <Inner>
        <SectionLabel>ABOUT ME</SectionLabel>

        <ContentGrid>
          <TextColumn>
            <IntroTitle>
              서비스를 전달하다
              <br />
              직접 만드는 사람이 된
              <br />
              개발자 <strong>안한준</strong>입니다.
            </IntroTitle>

            <MainText>
              <p>
                B2B 기업 홍보기획팀에서 기업 지원 플랫폼을 기획하고 알리는 일을
                했습니다. 서비스를 전달하는 입장에서 일하다 보니, 플랫폼 안에서
                기능과 데이터가 연결되어 하나로 움직이는 구조가 눈에 들어왔고
                그걸 직접 만들고 싶다는 생각이 커졌습니다.
              </p>
              <p>
                개발을 배우며 단순히 화면을 완성하는 것보다, 사용자의 흐름에
                맞게 기능을 연결하고 데이터를 일관되게 유지하는 과정이 가장 보람
                있었습니다. 서비스 목적과 사용자 관점을 먼저 고민해온 경험이
                지금 코드를 짤 때 방향을 잡아준다고 믿습니다.
              </p>
            </MainText>

            <ProfileStrip>
              {profileItems.map((item) => (
                <ProfileItem key={item.label}>
                  <ProfileItemLabel>{item.label}</ProfileItemLabel>
                  <ProfileItemValue>{item.value}</ProfileItemValue>
                </ProfileItem>
              ))}
            </ProfileStrip>
          </TextColumn>

          <VisualColumn>
            <MoonCard aria-label="달과 밤하늘 이미지" />
          </VisualColumn>
        </ContentGrid>

        <TimelineSection>
          <TimelineTopRow>
            <TimelineHeader>CAREER · EDUCATION</TimelineHeader>
            <TimelineHint>drag to explore →</TimelineHint>
          </TimelineTopRow>
          <TimelineTrack
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {career.map((item) => (
              <TimelineCard key={item.period}>
                <TimelineTag $type={item.tag}>{item.tag}</TimelineTag>
                <TimelineCardTitle>{item.title}</TimelineCardTitle>
                <TimelineCardSub>{item.sub}</TimelineCardSub>
                <TimelineCardPeriod>{item.period}</TimelineCardPeriod>
              </TimelineCard>
            ))}
            <TimelineEndPad />
          </TimelineTrack>
        </TimelineSection>
      </Inner>
    </Wrapper>
  );
}

/* ── Wrapper ── */
const Wrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 110px clamp(28px, 6vw, 110px) 90px;
  color: #182033;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 82% 18%,
      rgba(116, 130, 189, 0.22),
      transparent 26%
    ),
    radial-gradient(
      circle at 18% 82%,
      rgba(202, 178, 168, 0.1),
      transparent 28%
    ),
    linear-gradient(135deg, #f2edeb 0%, #e5e4ee 46%, #d9dfeb 100%);
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  margin: 0 0 36px;
  color: #865f68;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2em;
`;

/* ── Main grid ── */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 0.72fr);
  gap: clamp(40px, 6vw, 100px);
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const IntroTitle = styled.h2`
  margin: 0;
  color: #172239;
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 300;
  line-height: 1.48;
  letter-spacing: -0.055em;

  strong {
    color: #6d5277;
    font-weight: 700;
  }
`;

const MainText = styled.div`
  display: grid;
  gap: 16px;

  p {
    margin: 0;
    color: rgba(24, 32, 51, 0.68);
    font-size: clamp(14px, 0.95vw, 16px);
    font-weight: 300;
    line-height: 1.95;
    letter-spacing: -0.03em;
  }
`;

/* ── Profile strip (below text, no card) ── */
const ProfileStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border-top: 1px solid rgba(24, 32, 51, 0.1);
  margin-top: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileItem = styled.div`
  padding: 14px 0 14px;
  border-bottom: 1px solid rgba(24, 32, 51, 0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:nth-child(odd) {
    padding-right: 24px;
    border-right: 1px solid rgba(24, 32, 51, 0.06);
  }

  &:nth-child(even) {
    padding-left: 24px;
  }

  @media (max-width: 640px) {
    &:nth-child(odd) {
      padding-right: 0;
      border-right: none;
    }
    &:nth-child(even) {
      padding-left: 0;
    }
  }
`;

const ProfileItemLabel = styled.span`
  color: rgba(24, 32, 51, 0.5);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ProfileItemValue = styled.span`
  color: #172239;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.45;
`;

/* ── Visual (right column) ── */
const VisualColumn = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`;

const MoonCard = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;

  overflow: hidden;
  border-radius: 200px 200px 24px 24px;

  background:
    linear-gradient(
      180deg,
      rgba(13, 17, 28, 0.04) 0%,
      rgba(13, 17, 28, 0.18) 50%,
      rgba(13, 17, 28, 0.84) 100%
    ),
    url(${moonImg});
  background-size: cover;
  background-position: center;

  border: 1px solid rgba(229, 224, 223, 0.1);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.32),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);

  &::after {
    content: "moon / growth / depth";
    position: absolute;
    left: 24px;
    bottom: 22px;
    color: rgba(229, 224, 223, 0.45);
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

/* ── Timeline (horizontal drag scroll) ── */
const TimelineSection = styled.div`
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid rgba(24, 32, 51, 0.1);
`;

const TimelineTopRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 18px;
`;

const TimelineHeader = styled.p`
  margin: 0;
  color: #865f68;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
`;

const TimelineHint = styled.span`
  color: rgba(24, 32, 51, 0.3);
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
`;

const TimelineTrack = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;

  /* 스크롤바 숨김 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 우측 페이드 힌트 */
  -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
`;

const TimelineCard = styled.div`
  flex: 0 0 clamp(200px, 22vw, 270px);
  padding: 18px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(24, 32, 51, 0.07);
  display: flex;
  flex-direction: column;
  gap: 7px;
  scroll-snap-align: start;
`;

const TimelineTag = styled.span`
  display: inline-block;
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ $type }) =>
    $type === "EDUCATION"
      ? "rgba(109, 82, 119, 0.1)"
      : "rgba(134, 95, 104, 0.1)"};
  border: 1px solid
    ${({ $type }) =>
      $type === "EDUCATION"
        ? "rgba(109, 82, 119, 0.2)"
        : "rgba(134, 95, 104, 0.2)"};
  color: ${({ $type }) => ($type === "EDUCATION" ? "#6d5277" : "#865f68")};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  align-self: flex-start;
`;

const TimelineCardTitle = styled.strong`
  color: #172239;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const TimelineCardSub = styled.span`
  color: rgba(24, 32, 51, 0.55);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.55;
`;

const TimelineCardPeriod = styled.span`
  margin-top: 4px;
  color: rgba(24, 32, 51, 0.32);
  font-size: 11px;
  letter-spacing: 0.02em;
`;

const TimelineEndPad = styled.div`
  flex: 0 0 40px;
`;
