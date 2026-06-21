import styled from "styled-components";
import moonImg from "../../../assets/images/달사진.jpg";

export default function AboutSection() {
  return (
    <Wrapper id="about" className="portfolio-section">
      <Inner>
        <SectionMeta>
          <span>ABOUT ME</span>
        </SectionMeta>

        <ContentGrid>
          <TextColumn>
            <IntroTitle>
              화면 뒤에 숨어 있는 흐름까지 살피는
              <br />
              개발자 <strong>안한준</strong>입니다.
            </IntroTitle>

            <MainText>
              <p>
                홍보 업무에서 정보가 사람에게 어떻게 보이고 전달되는지를
                고민했습니다. 개발을 시작한 뒤 그 관심은 사용자가 어디에서
                멈추는지, 데이터가 어디에서 달라지는지를 찾는 일로 이어졌습니다.
              </p>

              <p>
                파이널 프로젝트에서는 상품부터 결제와 리뷰까지 스토어 전체를
                맡았습니다. 서로 다른 구매 방식을 하나의 주문 경험으로 합치고,
                변경되는 상품 정보와 보존되어야 할 주문 기록을 구분했습니다.
              </p>
            </MainText>

            <StoryGrid>
              <StoryItem>
                <strong>불편을 발견합니다.</strong>
                <p>직접 사용하며 끊기는 순간과 혼란을 주는 데이터를 찾습니다.</p>
              </StoryItem>
              <StoryItem>
                <strong>화면과 데이터를 함께 봅니다.</strong>
                <p>UI의 편의성과 서버의 상태 변화를 하나의 흐름으로 연결합니다.</p>
              </StoryItem>
              <StoryItem>
                <strong>선택의 이유를 설명합니다.</strong>
                <p>무엇을 썼는지보다 왜 이 구조를 선택했는지 말할 수 있게 만듭니다.</p>
              </StoryItem>
            </StoryGrid>
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

      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 130px clamp(28px, 6vw, 110px) 120px;
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

  &::before {
    content: "";
    position: absolute;
    top: 92px;
    right: -120px;
    width: clamp(360px, 42vw, 780px);
    height: clamp(360px, 42vw, 780px);
    border-radius: 50%;
    background: rgba(116, 130, 189, 0.12);
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
    color: #865f68;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  small {
    color: rgba(24, 32, 51, 0.55);
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

  color: #172239;
  font-size: clamp(28px, 2.3vw, 46px);
  font-weight: 300;
  line-height: 1.45;
  letter-spacing: -0.055em;

  strong {
    color: #6d5277;
    font-weight: 700;
  }
`;

const MainText = styled.div`
  max-width: 760px;
  display: grid;
  gap: 22px;

  p {
    margin: 0;
    color: rgba(24, 32, 51, 0.7);
    font-size: clamp(15px, 1vw, 18px);
    font-weight: 300;
    line-height: 1.95;
    letter-spacing: -0.035em;
  }
`;

const StoryGrid = styled.div`
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StoryItem = styled.article`
  min-height: 190px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid rgba(24, 32, 51, 0.08);

  strong {
    margin-top: auto;
    color: #172239;
    font-size: 16px;
    line-height: 1.45;
    letter-spacing: -0.04em;
  }

  p {
    margin: 9px 0 0;
    color: rgba(24, 32, 51, 0.58);
    font-size: 13px;
    line-height: 1.65;
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
