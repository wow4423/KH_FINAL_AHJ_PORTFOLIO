import { useState } from "react";
import styled from "styled-components";

export default function ProjectDetailInfo({ project }) {
  const [openSet, setOpenSet] = useState(new Set([0]));

  const detail = project?.detail;
  if (!detail) return null;

  const troubleList = detail.troubles ?? [];
  const infoList = detail.info ?? [];
  const stackList = project?.stack ?? [];

  function toggle(idx) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  return (
    <Wrapper>

      {/* ── TECH CHALLENGES ── */}
      {troubleList.length > 0 && (
        <Block>
          <SectionHead>
            <Eyebrow>TECH CHALLENGES</Eyebrow>
            <EyebrowSub>직접 겪고 해결한 기술적 문제들</EyebrowSub>
          </SectionHead>

          <ChallengeList>
            {troubleList.map((trouble, idx) => {
              const isOpen = openSet.has(idx);
              const isString = typeof trouble === "string";

              return (
                <ChallengeItem key={idx}>
                  <ChallengeToggle
                    type="button"
                    onClick={() => toggle(idx)}
                    $open={isOpen}
                    aria-expanded={isOpen}
                  >
                    <ChallengeLeft>
                      <ChallengeNum $open={isOpen}>
                        {String(idx + 1).padStart(2, "0")}
                      </ChallengeNum>
                      <ChallengeTitle $open={isOpen}>
                        {isString ? trouble : trouble.title}
                      </ChallengeTitle>
                    </ChallengeLeft>
                    <ExpandMark $open={isOpen}>
                      {isOpen ? "−" : "+"}
                    </ExpandMark>
                  </ChallengeToggle>

                  {isOpen && !isString && (
                    <ChallengeBody>
                      <SituationText>{trouble.problem}</SituationText>

                      <SolutionDivider>
                        <DividerLine />
                        <DividerLabel>해결</DividerLabel>
                        <DividerLine />
                      </SolutionDivider>

                      <SolutionText>{trouble.solution}</SolutionText>
                    </ChallengeBody>
                  )}
                </ChallengeItem>
              );
            })}
          </ChallengeList>
        </Block>
      )}

      {/* ── PROJECT META ── */}
      {(infoList.length > 0 || stackList.length > 0) && (
        <MetaBlock>
          {infoList.length > 0 && (
            <MetaGrid>
              {infoList.map((info) => (
                <MetaItem key={info.label}>
                  <MetaLabel>{info.label}</MetaLabel>
                  <MetaValue>{info.value}</MetaValue>
                </MetaItem>
              ))}
            </MetaGrid>
          )}

          {stackList.length > 0 && (
            <StackRow>
              <StackLabel>Stack</StackLabel>
              <StackTags>
                {stackList.map((s) => (
                  <StackTag key={s}>{s}</StackTag>
                ))}
              </StackTags>
            </StackRow>
          )}
        </MetaBlock>
      )}

    </Wrapper>
  );
}

/* ─────────────────────────────────────────────────────
   Layout
───────────────────────────────────────────────────── */

const Wrapper = styled.div`
  display: grid;
  gap: 56px;
  margin-top: 56px;
`;

const Block = styled.section``;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 28px;
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

/* ─────────────────────────────────────────────────────
   Tech Challenges
───────────────────────────────────────────────────── */

const ChallengeList = styled.div`
  border-top: 1px solid rgba(229, 224, 223, 0.07);
`;

const ChallengeItem = styled.div`
  border-bottom: 1px solid rgba(229, 224, 223, 0.07);
`;

const ChallengeToggle = styled.button`
  width: 100%;
  padding: 22px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  background: transparent;
  border-left: 2px solid
    ${({ $open }) =>
      $open ? "var(--portfolio-lavender)" : "transparent"};
  transition:
    border-color 0.22s ease,
    background 0.18s ease;

  &:hover {
    background: rgba(229, 224, 223, 0.03);
  }
`;

const ChallengeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
`;

const ChallengeNum = styled.span`
  flex-shrink: 0;
  color: ${({ $open }) =>
    $open ? "var(--portfolio-lavender)" : "var(--portfolio-rose-beige)"};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  opacity: ${({ $open }) => ($open ? 1 : 0.55)};
  transition: color 0.22s ease, opacity 0.22s ease;
`;

const ChallengeTitle = styled.span`
  color: ${({ $open }) =>
    $open
      ? "var(--portfolio-white-soft)"
      : "rgba(229, 224, 223, 0.75)"};
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.04em;
  transition: color 0.22s ease;
`;

const ExpandMark = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid
    ${({ $open }) =>
      $open
        ? "rgba(116, 130, 189, 0.38)"
        : "rgba(229, 224, 223, 0.12)"};
  background: ${({ $open }) =>
    $open
      ? "rgba(116, 130, 189, 0.1)"
      : "rgba(229, 224, 223, 0.05)"};
  color: ${({ $open }) =>
    $open ? "var(--portfolio-lavender)" : "var(--portfolio-white-soft)"};
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  transition: all 0.22s ease;
`;

const ChallengeBody = styled.div`
  padding: 6px 16px 28px 52px;

  @media (max-width: 560px) {
    padding-left: 16px;
  }
`;

const SituationText = styled.p`
  margin: 0;
  color: rgba(247, 244, 242, 0.58);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.95;
  letter-spacing: -0.03em;
`;

const SolutionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(116, 130, 189, 0.18);
`;

const DividerLabel = styled.span`
  flex-shrink: 0;
  color: var(--portfolio-lavender);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const SolutionText = styled.p`
  margin: 0;
  color: var(--portfolio-text-sub);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.95;
  letter-spacing: -0.03em;
`;

/* ─────────────────────────────────────────────────────
   Project Meta
───────────────────────────────────────────────────── */

const MetaBlock = styled.div`
  padding: 24px 26px;
  border-radius: 18px;
  border: 1px solid rgba(229, 224, 223, 0.08);
  background: rgba(229, 224, 223, 0.03);
  display: grid;
  gap: 18px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 14px 24px;
`;

const MetaItem = styled.div`
  display: grid;
  gap: 4px;
`;

const MetaLabel = styled.span`
  color: var(--portfolio-text-muted);
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MetaValue = styled.strong`
  color: var(--portfolio-white-soft);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.5;
`;

const StackRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 4px;
  border-top: 1px solid rgba(229, 224, 223, 0.07);
`;

const StackLabel = styled.span`
  flex-shrink: 0;
  padding-top: 3px;
  color: var(--portfolio-text-muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StackTag = styled.span`
  height: 24px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  background: rgba(116, 130, 189, 0.1);
  border: 1px solid rgba(116, 130, 189, 0.17);
  color: var(--portfolio-lavender-soft);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;
