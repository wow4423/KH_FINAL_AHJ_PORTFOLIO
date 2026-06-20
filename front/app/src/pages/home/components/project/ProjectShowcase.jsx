import styled from "styled-components";

export default function ProjectShowcase({ project }) {
  const showcase = project?.detail?.showcase ?? [];
  if (showcase.length === 0) return null;

  return (
    <Wrapper>
      <SectionHead>
        <Eyebrow>WHAT I BUILT</Eyebrow>
        <EyebrowSub>직접 설계하고 구현한 기능들</EyebrowSub>
      </SectionHead>

      <List>
        {showcase.map((item) => {
          const hasImage = !!item.image;

          return (
            <Item key={item.tag} $hasImage={hasImage} $flip={item.flip}>

              {/* 이미지: non-flip이면 왼쪽 */}
              {hasImage && !item.flip && (
                <ImgPanel>
                  <ImgBox>
                    <ImgEl
                      src={item.image}
                      alt={item.imageLabel || item.title}
                    />
                    {item.imageLabel && (
                      <ImgCaption>{item.imageLabel}</ImgCaption>
                    )}
                  </ImgBox>
                </ImgPanel>
              )}

              {/* 텍스트 */}
              <TextPanel>
                <ItemTag>{item.tag}</ItemTag>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemContext>{item.context}</ItemContext>
                {item.points?.length > 0 && (
                  <PointList>
                    {item.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </PointList>
                )}
              </TextPanel>

              {/* 이미지: flip이면 오른쪽 */}
              {hasImage && item.flip && (
                <ImgPanel>
                  <ImgBox>
                    <ImgEl
                      src={item.image}
                      alt={item.imageLabel || item.title}
                    />
                    {item.imageLabel && (
                      <ImgCaption>{item.imageLabel}</ImgCaption>
                    )}
                  </ImgBox>
                </ImgPanel>
              )}

            </Item>
          );
        })}
      </List>
    </Wrapper>
  );
}

/* ─── Layout ─── */

const Wrapper = styled.section`
  margin-top: 52px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 36px;
`;

const Eyebrow = styled.p`
  margin: 0;
  color: var(--portfolio-rose-beige);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.22em;

  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 1px;
    margin-right: 10px;
    vertical-align: middle;
    background: var(--portfolio-rose-beige);
    opacity: 0.5;
  }
`;

const EyebrowSub = styled.span`
  color: var(--portfolio-text-muted);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

const List = styled.div``;

const Item = styled.article`
  display: grid;
  grid-template-columns: ${({ $hasImage, $flip }) => {
    if (!$hasImage) return "1fr";
    return $flip ? "0.88fr 1.12fr" : "1.12fr 0.88fr";
  }};
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  padding: 44px 0;
  border-bottom: 1px solid rgba(229, 224, 223, 0.07);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 36px 0;
  }
`;

/* ─── Image ─── */

const ImgPanel = styled.div``;

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.38),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  background: rgba(9, 10, 16, 0.8);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 52%,
      rgba(13, 17, 28, 0.68) 100%
    );
    pointer-events: none;
  }
`;

const ImgEl = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

const ImgCaption = styled.span`
  position: absolute;
  bottom: 12px;
  left: 14px;
  z-index: 1;
  color: rgba(229, 224, 223, 0.6);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
`;

/* ─── Text ─── */

const TextPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTag = styled.p`
  margin: 0 0 10px;
  color: var(--portfolio-rose-beige);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.24em;
  opacity: 0.7;
`;

const ItemTitle = styled.h5`
  margin: 0 0 16px;
  color: var(--portfolio-white-soft);
  font-size: clamp(18px, 1.45vw, 26px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.055em;
`;

const ItemContext = styled.p`
  margin: 0 0 22px;
  color: var(--portfolio-text-sub);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.95;
  letter-spacing: -0.03em;
`;

const PointList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;

  li {
    position: relative;
    padding-left: 14px;
    color: var(--portfolio-text-muted);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    letter-spacing: -0.025em;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.75em;
      width: 5px;
      height: 1px;
      background: var(--portfolio-rose-beige);
      opacity: 0.4;
    }
  }
`;
