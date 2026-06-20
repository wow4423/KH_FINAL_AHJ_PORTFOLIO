import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

const TABS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "build",    label: "BUILD" },
  { id: "solve",    label: "SOLVE" },
  { id: "reflect",  label: "REFLECT" },
];

const STACK_CATS = {
  frontend: {
    color: "#8fa0e0", bg: "rgba(116,130,189,0.12)", border: "rgba(116,130,189,0.24)",
    keys: new Set(["React","JavaScript","styled-components","HTML","CSS","Axios"]),
  },
  backend: {
    color: "#86c97a", bg: "rgba(134,201,122,0.1)", border: "rgba(134,201,122,0.22)",
    keys: new Set(["Spring Boot","Spring Security","Spring Data JPA","JWT","Java","JSP & Servlet","MyBatis"]),
  },
  infra: {
    color: "#c9b08a", bg: "rgba(201,176,138,0.1)", border: "rgba(201,176,138,0.22)",
    keys: new Set(["PostgreSQL","Oracle","AWS EC2","AWS RDS","AWS S3"]),
  },
  payment: {
    color: "#e8c060", bg: "rgba(232,192,96,0.1)", border: "rgba(232,192,96,0.22)",
    keys: new Set(["KakaoPay"]),
  },
};
function getStackStyle(name) {
  for (const cat of Object.values(STACK_CATS)) {
    if (cat.keys.has(name)) return cat;
  }
  return STACK_CATS.frontend;
}

const REFLECT_CATS = {
  DEPLOYMENT:    { color: "#e8b86e", bg: "rgba(232,184,110,0.09)", border: "rgba(232,184,110,0.22)" },
  ARCHITECTURE:  { color: "#8fa0e0", bg: "rgba(143,160,224,0.09)", border: "rgba(143,160,224,0.22)" },
  FRONTEND:      { color: "#6fc9b8", bg: "rgba(111,201,184,0.09)", border: "rgba(111,201,184,0.22)" },
  COLLABORATION: { color: "#d4897a", bg: "rgba(212,137,122,0.09)", border: "rgba(212,137,122,0.22)" },
  SPA:           { color: "#a17ed8", bg: "rgba(161,126,216,0.09)", border: "rgba(161,126,216,0.22)" },
  PERFORMANCE:   { color: "#e07a5a", bg: "rgba(224,122,90,0.09)",  border: "rgba(224,122,90,0.22)"  },
  FEATURE:       { color: "#7ab87a", bg: "rgba(122,184,122,0.09)", border: "rgba(122,184,122,0.22)" },
  INFRA:         { color: "#c9a44a", bg: "rgba(201,164,74,0.09)",  border: "rgba(201,164,74,0.22)"  },
  DOMAIN:        { color: "#c97ab0", bg: "rgba(201,122,176,0.09)", border: "rgba(201,122,176,0.22)" },
  DEFAULT:       { color: "rgba(202,178,168,0.8)", bg: "rgba(202,178,168,0.08)", border: "rgba(202,178,168,0.2)" },
};

export default function ProjectModal({ project, onClose }) {
  const [activeTab,       setActiveTab]       = useState("overview");
  const [openChallenges,  setOpenChallenges]  = useState(new Set([0]));
  const [openCodes,       setOpenCodes]       = useState(new Set());
  const [lightboxImg,     setLightboxImg]     = useState(null);
  const lightboxRef = useRef(null);

  useEffect(() => { lightboxRef.current = lightboxImg; }, [lightboxImg]);

  useEffect(() => {
    if (!project) return;
    setActiveTab("overview");
    setOpenChallenges(new Set([0]));
    setOpenCodes(new Set());
    setLightboxImg(null);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxRef.current) { setLightboxImg(null); }
      else { onClose(); }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [project, onClose]);

  if (!project) return null;

  const d         = project.detail ?? {};
  const flowLine  = d.flowLine       ?? [];
  const showcase  = d.showcase       ?? [];
  const troubles  = d.troubles       ?? [];
  const stats     = d.stats          ?? [];
  const domains   = d.serviceDomains ?? [];
  const reflect   = d.reflect        ?? {};
  const stackList = project.stack    ?? [];

  function toggleChallenge(idx) {
    setOpenChallenges((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }
  function toggleCode(idx) {
    setOpenCodes((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  return (
    <>
      {/* ── 이미지 라이트박스 ── */}
      {lightboxImg && (
        <Lightbox onClick={() => setLightboxImg(null)}>
          <LightboxImg
            src={lightboxImg}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
          />
          <LightboxClose onClick={() => setLightboxImg(null)}>×</LightboxClose>
        </Lightbox>
      )}

      <Overlay onClick={onClose}>
        <Content onClick={(e) => e.stopPropagation()}>

          {/* ── 고정 헤더 + 탭 ── */}
          <StickyTop>
            <ModalHeader>
              <HeaderLeft>
                <ProjectTypeBadge>{project.type}</ProjectTypeBadge>
                <HeaderTitle>{project.title}</HeaderTitle>
              </HeaderLeft>
              <HeaderRight>
                {project.links?.map((link) => (
                  <LinkBtn key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </LinkBtn>
                ))}
                <CloseButton type="button" onClick={onClose} aria-label="닫기">×</CloseButton>
              </HeaderRight>
            </ModalHeader>

            <TabNav>
              {TABS.map((tab) => (
                <TabBtn
                  key={tab.id}
                  type="button"
                  $active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabBtn>
              ))}
            </TabNav>
          </StickyTop>

          {/* ── 탭 바디 ── */}
          <TabBody>

            {/* ═══════════ OVERVIEW ═══════════ */}
            {activeTab === "overview" && (
              <>
                {stats.length > 0 && (
                  <StatsStrip>
                    {stats.map((s, i) => (
                      <StatItem key={i}>
                        <StatValue>{s.value}</StatValue>
                        <StatLabel>{s.label}</StatLabel>
                      </StatItem>
                    ))}
                  </StatsStrip>
                )}

                <Hero>
                  <Thumbnail $image={project.thumbnail}>
                    {!project.thumbnail && (
                      <ThumbnailFallback>
                        <span>{project.type}</span>
                        <strong>{project.colorText}</strong>
                      </ThumbnailFallback>
                    )}
                  </Thumbnail>
                  <HeroText>
                    <HeroStatement>{d.statement}</HeroStatement>
                    {flowLine.length > 0 && (
                      <FlowRow>
                        <FlowLabel>담당 흐름</FlowLabel>
                        <FlowSteps>
                          {flowLine.map((step, i) => (
                            <FlowGroup key={step}>
                              <FlowStep>{step}</FlowStep>
                              {i < flowLine.length - 1 && <FlowArrow>→</FlowArrow>}
                            </FlowGroup>
                          ))}
                        </FlowSteps>
                      </FlowRow>
                    )}
                    <HeroMeta>
                      <HeroPill>{project.period}</HeroPill>
                      <HeroPill>{project.role}</HeroPill>
                    </HeroMeta>
                  </HeroText>
                </Hero>

                {domains.length > 0 && (
                  <DomainBlock>
                    <DomainLabel>서비스 내 내 담당 영역</DomainLabel>
                    <DomainList>
                      {domains.map((dom) => (
                        <DomainChip key={dom.name} $mine={dom.mine}>
                          {dom.mine && <DomainDot />}
                          {dom.name}
                        </DomainChip>
                      ))}
                    </DomainList>
                  </DomainBlock>
                )}

                {d.overview && <OverviewBody>{d.overview}</OverviewBody>}

                {stackList.length > 0 && (
                  <StackBlock>
                    <StackBlockLabel>TECH STACK</StackBlockLabel>
                    <StackLegend>
                      {Object.entries(STACK_CATS).map(([key, val]) => {
                        if (!stackList.some((s) => val.keys.has(s))) return null;
                        return (
                          <LegendItem key={key} $color={val.color}>
                            <LegendDot $color={val.color} />{key}
                          </LegendItem>
                        );
                      })}
                    </StackLegend>
                    <StackTags>
                      {stackList.map((s) => {
                        const st = getStackStyle(s);
                        return (
                          <StackTag key={s} $color={st.color} $bg={st.bg} $border={st.border}>{s}</StackTag>
                        );
                      })}
                    </StackTags>
                  </StackBlock>
                )}
              </>
            )}

            {/* ═══════════ BUILD ═══════════ */}
            {activeTab === "build" && (
              <>
                <TabIntro>
                  <TabIntroTitle>What I Built</TabIntroTitle>
                  <TabIntroSub>직접 설계하고 구현한 기능들 — 이미지를 클릭하면 확대됩니다</TabIntroSub>
                </TabIntro>
                <ShowcaseList>
                  {showcase.map((item) => {
                    const hasImg = !!item.image;
                    return (
                      <ShowcaseItem key={item.tag} $hasImg={hasImg} $flip={item.flip}>
                        {hasImg && !item.flip && (
                          <ImgPanel>
                            <ImgBox onClick={() => setLightboxImg(item.image)}>
                              <ImgEl src={item.image} alt={item.imageLabel || item.title} />
                              {item.imageLabel && <ImgCaption>{item.imageLabel}</ImgCaption>}
                              <ImgZoomOverlay>
                                <ImgZoomIcon>⤢</ImgZoomIcon>
                                <ImgZoomText>클릭하여 확대</ImgZoomText>
                              </ImgZoomOverlay>
                            </ImgBox>
                          </ImgPanel>
                        )}
                        <TextPanel>
                          <ItemTag>{item.tag}</ItemTag>
                          <ItemTitle>{item.title}</ItemTitle>
                          <ItemContext>{item.context}</ItemContext>
                          {item.points?.length > 0 && (
                            <PointList>
                              {item.points.map((p, i) => <li key={i}>{p}</li>)}
                            </PointList>
                          )}
                        </TextPanel>
                        {hasImg && item.flip && (
                          <ImgPanel>
                            <ImgBox onClick={() => setLightboxImg(item.image)}>
                              <ImgEl src={item.image} alt={item.imageLabel || item.title} />
                              {item.imageLabel && <ImgCaption>{item.imageLabel}</ImgCaption>}
                              <ImgZoomOverlay>
                                <ImgZoomIcon>⤢</ImgZoomIcon>
                                <ImgZoomText>클릭하여 확대</ImgZoomText>
                              </ImgZoomOverlay>
                            </ImgBox>
                          </ImgPanel>
                        )}
                      </ShowcaseItem>
                    );
                  })}
                </ShowcaseList>
              </>
            )}

            {/* ═══════════ SOLVE ═══════════ */}
            {activeTab === "solve" && (
              <>
                <TabIntro>
                  <TabIntroTitle>How I Solved It</TabIntroTitle>
                  <TabIntroSub>제목을 클릭하면 내용이 펼쳐집니다</TabIntroSub>
                </TabIntro>

                <ChallengeCards>
                  {troubles.map((t, idx) => {
                    const isOpen   = openChallenges.has(idx);
                    const codeOpen = openCodes.has(idx);
                    return (
                      <ChallengeCard key={idx} $open={isOpen}>

                        {/* ── 헤더 ── */}
                        <ChallengeHeader
                          type="button"
                          onClick={() => toggleChallenge(idx)}
                          $open={isOpen}
                        >
                          <ChallengeHeaderLeft>
                            <CardIdx $open={isOpen}>0{idx + 1}</CardIdx>
                            <ChallengeHeaderText>
                              <CardTitle>{t.title}</CardTitle>
                              {t.keyTerm && <KeyTermBadge>{t.keyTerm}</KeyTermBadge>}
                            </ChallengeHeaderText>
                          </ChallengeHeaderLeft>
                          <ChevronIcon $open={isOpen}>›</ChevronIcon>
                        </ChallengeHeader>

                        {/* ── 아코디언 바디 ── */}
                        <AccordionWrap $open={isOpen}>
                          <AccordionInner>
                            <AccordionBody>

                              {/* 수치 비교 스트립 (metrics가 있을 때만) */}
                              {t.metrics && (
                                <MetricsStrip>
                                  <MetricsLabel>{t.metrics.label}</MetricsLabel>
                                  <MetricsRow>
                                    <MetricsBefore>
                                      <MetricsValue>{t.metrics.before.value}</MetricsValue>
                                      <MetricsSub>{t.metrics.before.sub}</MetricsSub>
                                    </MetricsBefore>
                                    <MetricsArrow>→</MetricsArrow>
                                    <MetricsAfter>
                                      <MetricsValue $highlight>{t.metrics.after.value}</MetricsValue>
                                      <MetricsSub $highlight>{t.metrics.after.sub}</MetricsSub>
                                    </MetricsAfter>
                                  </MetricsRow>
                                  {t.metrics.note && (
                                    <MetricsNote>{t.metrics.note}</MetricsNote>
                                  )}
                                </MetricsStrip>
                              )}

                              {/* 문제 */}
                              <NarrativeBlock>
                                <NarrativeTag $type="situation">SITUATION</NarrativeTag>
                                <NarrativeText>{t.problem}</NarrativeText>
                              </NarrativeBlock>

                              {/* 해결 */}
                              <NarrativeBlock>
                                <NarrativeTag $type="approach">APPROACH</NarrativeTag>
                                <NarrativeText $bright>{t.solution}</NarrativeText>
                              </NarrativeBlock>

                              {/* 코드 토글 */}
                              {t.codeSnippet && (
                                <CodeSection>
                                  <CodeToggleBtn
                                    type="button"
                                    onClick={() => toggleCode(idx)}
                                    $open={codeOpen}
                                  >
                                    <CodeToggleIcon $open={codeOpen}>›</CodeToggleIcon>
                                    {codeOpen ? "코드 닫기" : "코드 보기"}
                                  </CodeToggleBtn>
                                  <AccordionWrap $open={codeOpen}>
                                    <AccordionInner>
                                      <CodeBlock>
                                        <pre>{t.codeSnippet}</pre>
                                      </CodeBlock>
                                    </AccordionInner>
                                  </AccordionWrap>
                                </CodeSection>
                              )}

                            </AccordionBody>
                          </AccordionInner>
                        </AccordionWrap>
                      </ChallengeCard>
                    );
                  })}
                </ChallengeCards>
              </>
            )}

            {/* ═══════════ REFLECT ═══════════ */}
            {activeTab === "reflect" && (
              <ReflectWrap>

                {/* ── LEARNED ── */}
                {reflect.learned?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionHead>
                      <ReflectSectionLabel>WHAT I LEARNED</ReflectSectionLabel>
                      <ReflectSectionSub>이 프로젝트가 내 사고방식을 바꾼 것들</ReflectSectionSub>
                    </ReflectSectionHead>
                    <LearnedList>
                      {reflect.learned.map((item, i) => {
                        const cat = REFLECT_CATS[item.tag] ?? REFLECT_CATS.DEFAULT;
                        return (
                          <LearnedCard key={i} $color={cat.color}>
                            <LearnedLeft>
                              <LearnedNum $color={cat.color}>0{i + 1}</LearnedNum>
                            </LearnedLeft>
                            <LearnedContent>
                              <LearnedTopRow>
                                <ReflectTagBadge $color={cat.color} $bg={cat.bg} $border={cat.border}>
                                  {item.tag}
                                </ReflectTagBadge>
                              </LearnedTopRow>
                              <LearnedTitle>{item.title}</LearnedTitle>
                              <LearnedBody>{item.body}</LearnedBody>
                            </LearnedContent>
                          </LearnedCard>
                        );
                      })}
                    </LearnedList>
                  </ReflectSection>
                )}

                {/* ── WOULD DO DIFFERENTLY ── */}
                {reflect.wouldDoDifferently?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionHead>
                      <ReflectSectionLabel>WHAT I'D DO DIFFERENTLY</ReflectSectionLabel>
                      <ReflectSectionSub>알고 있지만 못 했던 것, 다음엔 할 것</ReflectSectionSub>
                    </ReflectSectionHead>
                    <WouldDoGrid>
                      {reflect.wouldDoDifferently.map((item, i) => {
                        if (typeof item === "string") {
                          return (
                            <WouldDoCard key={i}>
                              <ReflectTagBadge $color={REFLECT_CATS.DEFAULT.color} $bg={REFLECT_CATS.DEFAULT.bg} $border={REFLECT_CATS.DEFAULT.border}>NOTE</ReflectTagBadge>
                              <WouldDoBody>{item}</WouldDoBody>
                            </WouldDoCard>
                          );
                        }
                        const cat = REFLECT_CATS[item.category] ?? REFLECT_CATS.DEFAULT;
                        return (
                          <WouldDoCard key={i}>
                            <ReflectTagBadge $color={cat.color} $bg={cat.bg} $border={cat.border}>
                              {item.category}
                            </ReflectTagBadge>
                            <WouldDoTitle>{item.title}</WouldDoTitle>
                            <WouldDoBody>{item.body}</WouldDoBody>
                          </WouldDoCard>
                        );
                      })}
                    </WouldDoGrid>
                  </ReflectSection>
                )}

                {/* ── CLOSING ── */}
                {reflect.closing && (
                  <ReflectClosing>
                    <ReflectClosingText>{reflect.closing}</ReflectClosingText>
                  </ReflectClosing>
                )}

              </ReflectWrap>
            )}

          </TabBody>
        </Content>
      </Overlay>
    </>
  );
}

/* ═══════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════ */

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(5, 6, 10, 0.92);
  backdrop-filter: blur(24px);
  cursor: zoom-out;
  animation: ${fadeIn} 0.22s ease;
`;

const LightboxImg = styled.img`
  max-width: min(1100px, 100%);
  max-height: 88vh;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 40px 120px rgba(0,0,0,0.75);
  cursor: default;
  animation: ${scaleIn} 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  transition: background 0.18s, transform 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: rotate(90deg);
  }
`;

/* ═══════════════════════════════════════════
   OVERLAY / CONTENT
═══════════════════════════════════════════ */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  padding: clamp(12px, 2.5vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(9,10,16,0.85);
  backdrop-filter: blur(20px);
`;

const Content = styled.article`
  position: relative;
  width: min(1120px, 100%);
  height: min(920px, 92vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 24px;
  background:
    radial-gradient(ellipse 55% 28% at 15% -2%, rgba(116,130,189,0.2) 0%, transparent 55%),
    linear-gradient(160deg, #171d28 0%, #0d1320 100%);
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 80px 160px rgba(0,0,0,0.7);
`;

/* ═══════════════════════════════════════════
   STICKY TOP
═══════════════════════════════════════════ */

const StickyTop = styled.div`
  flex-shrink: 0;
  background: rgba(13,18,28,0.96);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const ModalHeader = styled.div`
  padding: 20px 28px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProjectTypeBadge = styled.span`
  color: var(--portfolio-rose-beige);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  opacity: 0.7;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  color: #f5f2f0;
  font-size: clamp(20px, 2.2vw, 34px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.06em;
`;

const HeaderRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 2px;
`;

const LinkBtn = styled.a`
  height: 28px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: rgba(116,130,189,0.12);
  border: 1px solid rgba(116,130,189,0.24);
  color: rgba(143,160,224,0.9);
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s, transform 0.18s, border-color 0.18s;

  &:hover {
    background: rgba(116,130,189,0.22);
    border-color: rgba(116,130,189,0.4);
    transform: translateY(-1px);
  }
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  color: rgba(245,242,240,0.55);
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
  transition: background 0.18s, transform 0.2s, color 0.18s;

  &:hover {
    background: rgba(202,178,168,0.18);
    color: #f5f2f0;
    transform: rotate(90deg);
  }
`;

const TabNav = styled.nav`
  padding: 0 28px;
  display: flex;
`;

const TabBtn = styled.button`
  padding: 10px 14px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: ${({ $active }) => ($active ? "#f5f2f0" : "rgba(245,242,240,0.28)")};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "var(--portfolio-rose-beige)" : "transparent")};
  transition: color 0.18s, border-color 0.18s;

  &:hover {
    color: ${({ $active }) => ($active ? "#f5f2f0" : "rgba(245,242,240,0.55)")};
  }
`;

/* ═══════════════════════════════════════════
   TAB BODY
═══════════════════════════════════════════ */

const TabBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 36px 52px;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
  }

  @media (max-width: 640px) {
    padding: 20px 20px 40px;
  }
`;

/* ═══════════════════════════════════════════
   OVERVIEW TAB
═══════════════════════════════════════════ */

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 24px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);

  @media (max-width: 560px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatItem = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-right: 1px solid rgba(255,255,255,0.06);
  &:last-child { border-right: none; }
`;

const StatValue = styled.strong`
  color: #f5f2f0;
  font-size: clamp(17px, 1.8vw, 24px);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
`;

const StatLabel = styled.span`
  color: rgba(245,242,240,0.38);
  font-size: 11px;
  font-weight: 400;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 0.75fr) minmax(200px, 1.25fr);
  gap: clamp(16px, 3vw, 40px);
  align-items: center;

  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 16px;
  background: ${({ $image }) =>
    $image
      ? `url(${$image}) center top / cover no-repeat`
      : `linear-gradient(140deg, rgba(37,64,122,0.9), rgba(116,130,189,0.4))`};
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 20px 56px rgba(0,0,0,0.5);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 35%, rgba(10,14,22,0.72) 100%);
  }
`;

const ThumbnailFallback = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  span {
    color: var(--portfolio-rose-beige);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin-bottom: 4px;
    opacity: 0.8;
  }
  strong {
    color: rgba(245,242,240,0.85);
    font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
    font-size: clamp(38px, 5vw, 80px);
    font-weight: normal;
    line-height: 0.9;
    letter-spacing: -0.08em;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HeroStatement = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.92);
  font-size: clamp(15px, 1.15vw, 19px);
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: -0.035em;
`;

const FlowRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const FlowLabel = styled.span`
  flex-shrink: 0;
  color: rgba(245,242,240,0.3);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FlowSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

const FlowGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const FlowStep = styled.span`
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(116,130,189,0.12);
  border: 1px solid rgba(116,130,189,0.2);
  color: rgba(143,160,224,0.88);
  font-size: 11px;
  font-weight: 600;
`;

const FlowArrow = styled.span`
  color: rgba(116,130,189,0.3);
  font-size: 11px;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const HeroPill = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(245,242,240,0.45);
  font-size: 11px;
  font-weight: 400;
`;

const DomainBlock = styled.div`
  margin-top: 24px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  display: grid;
  gap: 12px;
`;

const DomainLabel = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.35);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const DomainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DomainChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: ${({ $mine }) => ($mine ? "700" : "400")};

  ${({ $mine }) =>
    $mine
      ? css`
          background: rgba(202,178,168,0.12);
          border: 1.5px solid rgba(202,178,168,0.38);
          color: var(--portfolio-rose-beige);
        `
      : css`
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(245,242,240,0.32);
        `}
`;

const DomainDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--portfolio-rose-beige);
  flex-shrink: 0;
`;

const OverviewBody = styled.p`
  margin: 20px 0 0;
  color: rgba(245,242,240,0.62);
  font-size: 14px;
  font-weight: 300;
  line-height: 2;
  letter-spacing: -0.022em;
`;

const StackBlock = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 12px;
`;

const StackBlockLabel = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.3);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const StackLegend = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.7;
`;

const LegendDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StackTag = styled.span`
  height: 27px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 7px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 600;
`;

/* ═══════════════════════════════════════════
   BUILD TAB
═══════════════════════════════════════════ */

const TabIntro = styled.div`
  margin-bottom: 28px;
`;

const TabIntroTitle = styled.h3`
  margin: 0 0 6px;
  color: #f5f2f0;
  font-size: clamp(22px, 2.2vw, 34px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.07em;
`;

const TabIntroSub = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.35);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

const ShowcaseList = styled.div``;

const ShowcaseItem = styled.article`
  display: grid;
  grid-template-columns: ${({ $hasImg, $flip }) =>
    !$hasImg ? "1fr" : $flip ? "0.92fr 1.08fr" : "1.08fr 0.92fr"};
  gap: clamp(16px, 3.5vw, 48px);
  align-items: center;
  padding: 36px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  &:first-child { padding-top: 0; }
  &:last-child  { border-bottom: none; padding-bottom: 0; }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 24px 0;
  }
`;

const ImgPanel = styled.div``;

const ImgBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 52px rgba(0,0,0,0.48);
  background: rgba(9,10,16,0.8);
  cursor: zoom-in;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(10,14,22,0.68) 100%);
    pointer-events: none;
    transition: opacity 0.22s;
  }
`;

const ImgEl = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${ImgBox}:hover & {
    transform: scale(1.04);
  }
`;

const ImgCaption = styled.span`
  position: absolute;
  bottom: 10px;
  left: 12px;
  z-index: 2;
  color: rgba(245,242,240,0.48);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
`;

const ImgZoomOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(10,14,22,0.55);
  backdrop-filter: blur(3px);
  opacity: 0;
  transition: opacity 0.22s;

  ${ImgBox}:hover & {
    opacity: 1;
  }
`;

const ImgZoomIcon = styled.span`
  color: #f5f2f0;
  font-size: 26px;
  line-height: 1;
`;

const ImgZoomText = styled.span`
  color: rgba(245,242,240,0.75);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
`;

const TextPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTag = styled.p`
  margin: 0 0 9px;
  color: var(--portfolio-rose-beige);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.26em;
  opacity: 0.55;
`;

const ItemTitle = styled.h5`
  margin: 0 0 13px;
  color: #f5f2f0;
  font-size: clamp(17px, 1.5vw, 25px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.055em;
`;

const ItemContext = styled.p`
  margin: 0 0 16px;
  color: rgba(245,242,240,0.72);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.026em;
`;

const PointList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 7px;

  li {
    position: relative;
    padding-left: 15px;
    color: rgba(245,242,240,0.46);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.7;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 6px;
      height: 1px;
      background: var(--portfolio-rose-beige);
      opacity: 0.4;
    }
  }
`;

/* ═══════════════════════════════════════════
   SOLVE TAB
═══════════════════════════════════════════ */

const ChallengeCards = styled.div`
  display: grid;
  gap: 10px;
`;

const ChallengeCard = styled.div`
  border-radius: 18px;
  border: 1px solid ${({ $open }) =>
    $open ? "rgba(116,130,189,0.22)" : "rgba(255,255,255,0.07)"};
  background: ${({ $open }) =>
    $open ? "rgba(116,130,189,0.04)" : "rgba(255,255,255,0.015)"};
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;

  &:hover {
    border-color: ${({ $open }) =>
      $open ? "rgba(116,130,189,0.28)" : "rgba(255,255,255,0.12)"};
  }
`;

const ChallengeHeader = styled.button`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition: background 0.18s;

  &:hover {
    background: rgba(255,255,255,0.018);
  }
`;

const ChallengeHeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
`;

const CardIdx = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: ${({ $open }) =>
    $open ? "rgba(202,178,168,0.15)" : "rgba(202,178,168,0.07)"};
  border: 1px solid ${({ $open }) =>
    $open ? "rgba(202,178,168,0.32)" : "rgba(202,178,168,0.14)"};
  color: var(--portfolio-rose-beige);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  transition: background 0.2s, border-color 0.2s;
`;

const ChallengeHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const CardTitle = styled.h4`
  margin: 0;
  color: #f5f2f0;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.045em;
`;

const KeyTermBadge = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 5px;
  background: rgba(116,130,189,0.12);
  border: 1px solid rgba(116,130,189,0.22);
  color: rgba(143,160,224,0.88);
  font-size: 11px;
  font-weight: 700;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  letter-spacing: 0.02em;
`;

const ChevronIcon = styled.span`
  flex-shrink: 0;
  color: rgba(245,242,240,0.3);
  font-size: 20px;
  line-height: 1;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;

  ${ChallengeCard}:hover & { color: rgba(245,242,240,0.5); }
`;

/* ─── Accordion ─── */

const AccordionWrap = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AccordionInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

const AccordionBody = styled.div`
  padding: 0 24px 24px;
  display: grid;
  gap: 20px;
`;

/* ─── 수치 비교 스트립 ─── */

const MetricsStrip = styled.div`
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  display: grid;
  gap: 12px;
`;

const MetricsLabel = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.32);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const MetricsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const MetricsBefore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MetricsAfter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MetricsValue = styled.strong`
  font-size: clamp(22px, 2.2vw, 32px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: ${({ $highlight }) =>
    $highlight ? "rgba(143,160,224,0.95)" : "rgba(245,242,240,0.45)"};
`;

const MetricsSub = styled.span`
  font-size: 11px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: ${({ $highlight }) =>
    $highlight ? "rgba(143,160,224,0.7)" : "rgba(245,242,240,0.3)"};
`;

const MetricsArrow = styled.span`
  font-size: 22px;
  color: rgba(245,242,240,0.18);
  flex-shrink: 0;
`;

const MetricsNote = styled.p`
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  color: rgba(245,242,240,0.35);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.01em;
`;

/* ─── 문제/해결 서사 블록 ─── */

const NarrativeBlock = styled.div`
  display: grid;
  gap: 10px;
`;

const NarrativeTag = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    opacity: 0.18;
  }

  ${({ $type }) =>
    $type === "situation"
      ? css`
          color: rgba(228,148,100,0.75);
          &::after { background: rgba(228,148,100,1); }
        `
      : css`
          color: rgba(143,160,224,0.75);
          &::after { background: rgba(143,160,224,1); }
        `}
`;

const NarrativeText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.022em;
  color: ${({ $bright }) =>
    $bright ? "rgba(245,242,240,0.82)" : "rgba(245,242,240,0.6)"};
`;

/* ─── 코드 토글 ─── */

const CodeSection = styled.div`
  display: grid;
  gap: 8px;
`;

const CodeToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(245,242,240,0.45);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.18s, color 0.18s, border-color 0.18s;

  &:hover {
    background: rgba(116,130,189,0.1);
    border-color: rgba(116,130,189,0.22);
    color: rgba(143,160,224,0.85);
  }
`;

const CodeToggleIcon = styled.span`
  font-size: 14px;
  font-weight: 300;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.22s;
  display: inline-block;
  line-height: 1;
`;

const CodeBlock = styled.div`
  border-radius: 11px;
  background: rgba(0,0,0,0.42);
  border: 1px solid rgba(255,255,255,0.06);
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 16px 18px;
    font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.75;
    color: rgba(245,242,240,0.65);
    white-space: pre;
    tab-size: 2;
  }

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
  }
`;

/* ═══════════════════════════════════════════
   REFLECT TAB
═══════════════════════════════════════════ */

const ReflectWrap = styled.div`
  display: grid;
  gap: 44px;
`;

const ReflectSection = styled.div`
  display: grid;
  gap: 16px;
`;

const ReflectSectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const ReflectSectionLabel = styled.p`
  margin: 0;
  flex-shrink: 0;
  color: rgba(245,242,240,0.3);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const ReflectSectionSub = styled.span`
  color: rgba(245,242,240,0.2);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

/* ─── Learned ─── */

const LearnedList = styled.div`
  display: grid;
  gap: 10px;
`;

const LearnedCard = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 15px;
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 2px solid ${({ $color }) => $color};
  background: rgba(255,255,255,0.018);
  transition: background 0.2s;

  &:hover { background: rgba(255,255,255,0.03); }
`;

const LearnedLeft = styled.div`
  padding-top: 1px;
  display: flex;
  justify-content: center;
`;

const LearnedNum = styled.span`
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  opacity: 0.5;
`;

const LearnedContent = styled.div`
  display: grid;
  gap: 7px;
`;

const LearnedTopRow = styled.div`
  display: flex;
  align-items: center;
`;

const LearnedTitle = styled.h5`
  margin: 0;
  color: #f5f2f0;
  font-size: clamp(14px, 1.15vw, 17px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.045em;
`;

const LearnedBody = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.62);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.9;
  letter-spacing: -0.025em;
`;

/* ─── Shared tag badge ─── */

const ReflectTagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 4px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  color: ${({ $color }) => $color};
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

/* ─── Would Do Differently ─── */

const WouldDoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
`;

const WouldDoCard = styled.div`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015);
  display: grid;
  gap: 8px;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.025);
  }
`;

const WouldDoTitle = styled.h5`
  margin: 0;
  color: rgba(245,242,240,0.88);
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.04em;
`;

const WouldDoBody = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.5);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.85;
  letter-spacing: -0.02em;
`;

/* ─── Closing ─── */

const ReflectClosing = styled.div`
  padding: 18px 22px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.05);
  border-left: 3px solid rgba(202,178,168,0.3);
  background: rgba(255,255,255,0.015);
`;

const ReflectClosingText = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.4);
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  line-height: 1.85;
  letter-spacing: -0.02em;
`;
