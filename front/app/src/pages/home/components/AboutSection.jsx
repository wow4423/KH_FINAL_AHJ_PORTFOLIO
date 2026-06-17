import styled from "styled-components";
import moonImg from "../../../assets/images/달사진.jpg";

export default function AboutSection() {
  return (
    <Wrapper id="about" className="portfolio-section">
      <Inner>
        <SectionMeta>
          <span>ABOUT ME</span>
          <small>조금 느려도 끝까지 완성하는 사람</small>
        </SectionMeta>

        <TopCopy>
          <p>I KEEP MOVING,</p>
          <strong>UNTIL THE FLOW WORKS.</strong>
        </TopCopy>

        <ContentGrid>
          <TextColumn>
            <IntroTitle>
              안녕하세요.
              <br />
              흐름을 설계하는 웹 개발자 <strong>안한준</strong>입니다.
            </IntroTitle>

            <MainText>
              <p>
                저는 화면을 단순히 예쁘게 만드는 것보다, 사용자가 어떤 순서로
                서비스를 이용하고 데이터가 어떤 흐름으로 이어지는지를 함께
                고민하는 개발자입니다.
              </p>

              <p>
                홍보 업무를 경험하며 사람들에게 정보가 어떻게 보이고
                전달되는지에 관심을 갖게 되었고, 이후 개발을 배우면서 그 관심은
                자연스럽게 사용자 경험과 화면 구성, 서비스 흐름 설계로
                이어졌습니다.
              </p>

              <p>
                세미 프로젝트에서는 ERP 시스템의 인적관리 도메인을 담당하며
                근태, 급여, 인건비 데이터가 연결되는 구조를 경험했고, 파이널
                프로젝트에서는 반려동물 통합 서비스의 스토어 도메인을 맡아 상품,
                장바구니, 주문, 결제, 리뷰까지 이어지는 전체 구매 흐름을
                구현했습니다.
              </p>

              <p>
                저는 아직 완성된 개발자라기보다, 매번 문제를 만나고 해결하면서
                조금씩 더 단단해지는 개발자에 가깝습니다. 그래서 앞으로도
                사용자가 편하게 사용할 수 있는 서비스, 그리고 제가 설명할 수
                있는 코드를 만드는 사람이 되고 싶습니다.
              </p>
            </MainText>
          </TextColumn>

          <VisualColumn>
            <MoonCard aria-label="달과 밤하늘 이미지" />

            <ProfileCard>
              <ProfileLabel>PROFILE</ProfileLabel>

              <ProfileList>
                <li>
                  <span>Name</span>
                  <strong>안한준</strong>
                </li>
                <li>
                  <span>Role</span>
                  <strong>Fullstack Web Developer</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>UI Flow · Data Flow · Service Logic</strong>
                </li>
              </ProfileList>
            </ProfileCard>
          </VisualColumn>
        </ContentGrid>

        <KeywordList>
          <span>#흐름을_설계하는</span>
          <span>#끈기있는</span>
          <span>#사용자경험</span>
          <span>#풀스택개발자</span>
          <span>#서비스완성도</span>
        </KeywordList>
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
      circle at 82% 18%,
      rgba(116, 130, 189, 0.22),
      transparent 26%
    ),
    radial-gradient(
      circle at 18% 82%,
      rgba(202, 178, 168, 0.1),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #171421 0%,
      var(--portfolio-navy-black) 44%,
      #101727 100%
    );

  &::before {
    content: "";
    position: absolute;
    top: 92px;
    right: -120px;
    width: clamp(360px, 42vw, 780px);
    height: clamp(360px, 42vw, 780px);
    border-radius: 50%;
    background: rgba(116, 130, 189, 0.08);
    filter: blur(2px);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: clamp(28px, 6vw, 110px);
    bottom: 80px;
    width: min(560px, 42vw);
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(202, 178, 168, 0.5),
      rgba(116, 130, 189, 0.18),
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

const SectionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 36px;

  span {
    color: var(--portfolio-rose-beige);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  small {
    color: var(--portfolio-text-muted);
    font-size: 14px;
    font-weight: 300;
    letter-spacing: -0.02em;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

const TopCopy = styled.div`
  margin-bottom: clamp(52px, 6vw, 96px);

  p,
  strong {
    display: block;
    font-family: "PyeojinGothic", "Noto Sans KR", sans-serif;
    line-height: 0.96;
    letter-spacing: -0.06em;
  }

  p {
    color: rgba(229, 224, 223, 0.72);
    font-size: clamp(42px, 5.2vw, 96px);
    font-weight: 300;
  }

  strong {
    margin-top: 8px;
    color: var(--portfolio-white-soft);
    font-size: clamp(50px, 6.4vw, 122px);
    font-weight: 700;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(520px, 1.05fr) minmax(380px, 0.95fr);
  gap: clamp(48px, 7vw, 120px);
  align-items: end;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const TextColumn = styled.div`
  position: relative;
  z-index: 2;
`;

const IntroTitle = styled.h2`
  margin: 0 0 34px;

  color: var(--portfolio-white-soft);
  font-size: clamp(28px, 2.3vw, 46px);
  font-weight: 300;
  line-height: 1.45;
  letter-spacing: -0.055em;

  strong {
    color: #dcd8ff;
    font-weight: 700;
  }
`;

const MainText = styled.div`
  max-width: 760px;
  display: grid;
  gap: 22px;

  p {
    margin: 0;
    color: var(--portfolio-text-sub);
    font-size: clamp(15px, 1vw, 18px);
    font-weight: 300;
    line-height: 1.95;
    letter-spacing: -0.035em;
  }
`;

const VisualColumn = styled.div`
  position: relative;
  min-height: 680px;

  @media (max-width: 1100px) {
    min-height: auto;
    display: grid;
    grid-template-columns: minmax(280px, 420px) minmax(280px, 1fr);
    gap: 24px;
    align-items: end;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MoonCard = styled.div`
  position: absolute;
  right: 0;
  bottom: 80px;

  width: min(420px, 32vw);
  height: 620px;

  overflow: hidden;
  border-radius: 220px 220px 24px 24px;

  background:
    linear-gradient(
      180deg,
      rgba(13, 17, 28, 0.04) 0%,
      rgba(13, 17, 28, 0.18) 52%,
      rgba(13, 17, 28, 0.82) 100%
    ),
    url(${moonImg});
  background-size: cover;
  background-position: center;

  border: 1px solid rgba(229, 224, 223, 0.1);
  box-shadow:
    0 42px 100px rgba(0, 0, 0, 0.42),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(23, 20, 33, 0.26) 0%,
      transparent 38%,
      rgba(23, 20, 33, 0.18) 100%
    );
  }

  &::after {
    content: "moon / growth / depth";
    position: absolute;
    left: 28px;
    bottom: 26px;

    color: rgba(229, 224, 223, 0.56);
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 1100px) {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 460px;
  }

  @media (max-width: 760px) {
    height: 420px;
    border-radius: 180px 180px 22px 22px;
  }
`;

const ProfileCard = styled.div`
  position: absolute;
  right: min(300px, 23vw);
  bottom: 0;
  z-index: 2;

  width: min(360px, 72vw);
  padding: 26px 26px 24px;

  border-radius: 22px;
  background: rgba(229, 224, 223, 0.07);
  border: 1px solid rgba(229, 224, 223, 0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.26);

  @media (max-width: 1100px) {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
  }
`;

const ProfileLabel = styled.div`
  margin-bottom: 20px;

  color: var(--portfolio-rose-beige);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
`;

const ProfileList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 16px;

  li {
    display: grid;
    gap: 4px;
  }

  span {
    color: var(--portfolio-text-muted);
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    color: var(--portfolio-white-soft);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
`;

const KeywordList = styled.div`
  margin-top: clamp(58px, 7vw, 110px);

  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  span {
    height: 36px;
    padding: 0 16px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.07);
    border: 1px solid rgba(229, 224, 223, 0.08);

    color: var(--portfolio-white-soft);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.03em;

    transition:
      background-color 0.18s ease,
      transform 0.18s ease;
  }

  span:hover {
    background-color: rgba(116, 130, 189, 0.18);
    transform: translateY(-2px);
  }
`;
